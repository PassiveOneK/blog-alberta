import cityData from "../../../../public/data/city-info.json";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CityInfoItem {
  id: string;
  title: string;
  category: "행사" | "혜택";
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  link: string;
}

// 날짜 포맷 변경 함수
const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

// Next.js 15 정적 배포용 파라미터 매핑 함수
export async function generateStaticParams() {
  return cityData.map((item) => ({
    id: item.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InfoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const items = cityData as CityInfoItem[];
  const item = items.find((d) => d.id === id);

  if (!item) {
    notFound();
  }

  const isEvent = item.category === "행사";
  const themeColor = isEvent ? "amber" : "emerald";
  const lastUpdated = "2026년 8월 2일";

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-sans flex flex-col justify-between">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              🏡
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors duration-200">
                성남시 <span className="text-amber-600">생활 정보</span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">우리 동네 행사와 혜택 소식</p>
            </div>
          </Link>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/50">
              📍 경기도 성남시
            </span>
          </div>
        </div>
      </header>

      {/* 메인 본문 영역 */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full">
        {/* 뒤로가기 링크 */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span> 목록으로 돌아가기
          </Link>
        </div>

        {/* 상세 내용 카드 */}
        <article className="bg-white rounded-3xl border border-stone-200/60 shadow-xs p-6 sm:p-10 space-y-8">
          {/* 상단 태그 및 제목 */}
          <div className="space-y-4">
            <div>
              {isEvent ? (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200/30">
                  {item.category}
                </span>
              ) : (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/30">
                  {item.category}
                </span>
              )}
            </div>
            
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-stone-900 leading-tight">
              {item.title}
            </h2>
          </div>

          {/* 메타 정보 안내 박스 */}
          <div className={`p-5 rounded-2xl space-y-3.5 text-sm ${isEvent ? "bg-amber-50/40 border border-amber-100/50" : "bg-emerald-50/30 border border-emerald-100/50"}`}>
            {isEvent && (
              <div className="flex items-start gap-3">
                <span className="text-amber-600 text-base select-none mt-0.5">📅</span>
                <div>
                  <span className="block text-stone-500 text-xs font-bold uppercase tracking-wider mb-0.5">행사 기간</span>
                  <span className="text-stone-800 font-bold">
                    {item.startDate === item.endDate 
                      ? formatDate(item.startDate) 
                      : `${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}`}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <span className={`${isEvent ? "text-amber-600" : "text-emerald-600"} text-base select-none mt-0.5`}>📍</span>
              <div>
                <span className="block text-stone-500 text-xs font-bold uppercase tracking-wider mb-0.5">
                  {isEvent ? "행사 장소" : "신청 및 접수처"}
                </span>
                <span className="text-stone-800 font-bold">{item.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className={`${isEvent ? "text-amber-600" : "text-emerald-600"} text-base select-none mt-0.5`}>👥</span>
              <div>
                <span className="block text-stone-500 text-xs font-bold uppercase tracking-wider mb-0.5">지원 대상</span>
                <span className="text-stone-800 font-bold">{item.target}</span>
              </div>
            </div>
          </div>

          {/* 상세 내용 전문 */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
              <span className={`w-1 h-4 rounded-full ${isEvent ? "bg-amber-500" : "bg-emerald-500"}`}></span>
              상세내용 요약
            </h3>
            <p className="text-stone-600 text-base leading-relaxed whitespace-pre-line font-medium">
              {item.summary}
            </p>
          </div>

          {/* 신청 및 외부 링크 액션 영역 */}
          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:flex-1 py-4 text-center font-bold text-base rounded-2xl text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 ${
                isEvent 
                  ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10" 
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10"
              }`}
            >
              {isEvent ? "공식 홈페이지 바로가기" : "자세히 보기 및 신청하기"} →
            </a>
            
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-4 text-center text-stone-600 hover:text-stone-950 font-bold text-sm bg-stone-100 hover:bg-stone-200/75 transition-colors duration-200 rounded-2xl border border-stone-200/50"
            >
              목록으로
            </Link>
          </div>
        </article>
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-stone-900 text-stone-400 py-10 mt-16 border-t border-stone-850">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏡</span>
              <span className="font-bold text-white text-lg">성남시 생활 정보</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 text-center md:text-left">
              본 서비스는 공공데이터포털(data.go.kr)의 정보를 수집하여 제공하고 있습니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
            <p>© 2026 성남시 생활 정보. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span>최종 업데이트: {lastUpdated}</span>
              <span className="text-stone-700">|</span>
              <a href="#" className="hover:underline">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
