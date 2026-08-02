import Link from "next/link";
import cityData from "../../public/data/city-info.json";

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

const items = cityData as CityInfoItem[];
const events = items.filter((item) => item.category === "행사");
const benefits = items.filter((item) => item.category === "혜택");

// 날짜 포맷 변경 함수 (예: 2026-04-05 -> 2026년 4월 5일)
const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

export default function Home() {
  const lastUpdated = "2026년 8월 2일";

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-sans flex flex-col justify-between">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shadow-amber-500/20">
              🏡
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                성남시 <span className="text-amber-600">생활 정보</span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">우리 동네 행사와 혜택 소식</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/50">
              📍 경기도 성남시
            </span>
            <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold rounded-full">
              실시간 업데이트
            </span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full">
        {/* 인트로 배너 */}
        <section className="mb-12 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-3xl p-6 sm:p-10 border border-amber-100/70 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 leading-tight">
              오늘 우리 동네 소식은 무엇일까요?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              성남시에서 열리는 다양한 축제 정보부터 놓치기 쉬운 정부/지자체 청년·출산 지원금 혜택까지 한번에 확인하세요!
            </p>
          </div>
          <div className="hidden md:flex text-6xl select-none animate-bounce duration-1000">
            🌸💰
          </div>
        </section>

        {/* 이번 달 행사/축제 목록 */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl sm:text-3xl">🌸</span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">이번 달 행사 / 축제</h3>
            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">
              {events.length}건
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl border border-stone-200/60 shadow-xs hover:shadow-lg hover:border-amber-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* 카테고리 태그 */}
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200/30">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* 제목 */}
                  <h4 className="text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors duration-200">
                    {event.title}
                  </h4>
                  
                  {/* 요약 설명 */}
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {event.summary}
                  </p>
                  
                  {/* 상세 정보 목록 */}
                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">📅</span>
                      <span>
                        {event.startDate === event.endDate 
                          ? formatDate(event.startDate) 
                          : `${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">👥</span>
                      <span>대상: {event.target}</span>
                    </div>
                  </div>
                </div>
                
                {/* 버튼 */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/info/${event.id}/`}
                    className="w-full py-2.5 bg-stone-50 hover:bg-amber-500 hover:text-white text-stone-700 text-center font-bold text-sm rounded-xl border border-stone-200/80 hover:border-amber-500 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    자세히 보기 <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 지원금/혜택 정보 목록 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl sm:text-3xl">💰</span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">우리 동네 지원금 / 혜택</h3>
            <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
              {benefits.length}건
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id}
                className="bg-white rounded-2xl border border-stone-200/60 shadow-xs hover:shadow-lg hover:border-emerald-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* 카테고리 태그 */}
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/30">
                      {benefit.category}
                    </span>
                  </div>
                  
                  {/* 제목 */}
                  <h4 className="text-lg font-bold text-stone-900 group-hover:text-emerald-600 transition-colors duration-200">
                    {benefit.title}
                  </h4>
                  
                  {/* 요약 설명 */}
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {benefit.summary}
                  </p>
                  
                  {/* 상세 정보 목록 */}
                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">👥</span>
                      <span>대상: {benefit.target}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">📍</span>
                      <span>접수처: {benefit.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* 버튼 */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/info/${benefit.id}/`}
                    className="w-full py-2.5 bg-stone-50 hover:bg-emerald-600 hover:text-white text-stone-700 text-center font-bold text-sm rounded-xl border border-stone-200/80 hover:border-emerald-600 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    신청 정보 확인 <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
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
