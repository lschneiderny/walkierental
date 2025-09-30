import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 4,
      acl: "public-read",
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await getServerSession(authOptions);

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new UploadThingError("Unauthorized");
      
      // Check if user is admin for admin uploads
      const userRole = (session.user as any).role;
      if (userRole !== "ADMIN") {
        throw new UploadThingError("Only admins can upload images");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { 
        userId: (session.user as any).id,
        userEmail: session.user.email,
        userRole: userRole
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
