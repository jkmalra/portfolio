type ProjectTagListProps = {
  tags: string[];
  limit?: number;
};

export function ProjectTagList({ tags, limit = tags.length }: ProjectTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag) => (
        <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
          {tag}
        </span>
      ))}
    </div>
  );
}
