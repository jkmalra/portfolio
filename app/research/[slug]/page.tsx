import { redirect } from "next/navigation";

export default async function ResearchEntryRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/intelligence/${slug}`);
}
