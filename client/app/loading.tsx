// client/app/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      {/* 타이틀 스켈레톤 */}
      <div className="flex justify-between items-end mb-8">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* 상품 그리드 스켈레톤 (6개) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="aspect-square bg-gray-200 rounded-xl mb-5 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
            <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}