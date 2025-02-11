export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="animate-spin h-20 w-20 border-t-4 border-primary rounded-full" />
    </div>
  );
}
