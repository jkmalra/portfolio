import { redirect } from "next/navigation";

export default async function BlogEntryRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/intelligence/${slug}`);
}
