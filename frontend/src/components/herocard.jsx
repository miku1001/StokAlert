import { FiAlertTriangle, FiBookOpen, FiChevronRight, FiCloudRain, FiDollarSign, FiGift, FiMoreHorizontal, FiShoppingCart, FiZap } from 'react-icons/fi'

function HeroCard() {
  return (
    <div className=" mb-2 mx-4 p-4 sm:p-0 sm:mx-8 lg:mx-25 bg-[#0a0a0a] border border-zinc-700 rounded-xl overflow-hidden">
      <div className="flex items-center px-5 py-1 border-b border-zinc-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-800"></div>
          <div className="w-3 h-3 rounded-full bg-amber-600"></div>
          <div className="w-3 h-3 rounded-full bg-teal-600"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs sm:text-xs border border-zinc-700 text-zinc-400 px-3 sm:px-5 py-1 rounded-lg inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>stokalerto.app / adela's store</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:p-6">

        <div className="px-1 sm:pl-13 sm:pr-3 mt-4 sm:mt-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight sm:leading-none pb-4 sm:pb-8">
            Never run out on the days <span className="text-amber-400">that pay.</span>
          </h1>

          <p className="text-zinc-400 max-w-xl text-sm sm:text-md leading-7 sm:leading-8 pr-0 sm:pr-10 pb-3">
            StokAlerto reads your daily sales and flags the demand spikes generic tools miss — payday weeks, typhoon stock-ups, the Christmas rush — then tells you exactly what to reorder, and by when.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 pb-6 sm:pb-8">
            <button className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl hover:scale-[1.02] hover:shadow-md hover:border-amber-400 transition-all w-full sm:w-auto">
              Try it free
            </button>
            <button className="group relative overflow-hidden border border-zinc-700 px-6 py-3 rounded-xl text-white transition-all duration-300 hover:scale-[1.05] hover:border-zinc-800 w-full sm:w-auto">
              <span className="relative z-10">See how it works</span>
              <span className="absolute -left-24 -bottom-24 h-0 w-0 rounded-full bg-zinc-800 transition-all duration-800 ease-out origin-bottom-left group-hover:h-75 group-hover:w-75"></span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 pb-2">
            No credit card. Works with your notebook or Excel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] sm:grid-rows-2 gap-3 mr-3">
          <div className="sm:row-span-2 bg-zinc-900 border-2 border-zinc-700 rounded-lg p-4 flex flex-col min-h-65">
            <p className="text-zinc-500 text-[10px] sm:text-xs font-semibold tracking-[0.3em] mb-4">
              DEMAND SIGNALS
            </p>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="bg-amber-400/15 text-amber-400 rounded-2xl px-4 py-3 flex items-center justify-between font-semibold">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiDollarSign className="text-lg shrink-0" />
                  <span>Sahod week</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>

              <div className="text-zinc-600 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiCloudRain className="shrink-0" />
                  <span>Bagyo season</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>

              <div className="text-zinc-600 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiGift className="shrink-0" />
                  <span>Pasko rush</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>

              <div className="text-zinc-600 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiBookOpen className="shrink-0" />
                  <span>Back-to-school</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>

              <div className="text-zinc-600 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiZap className="shrink-0" />
                  <span>Weekend spike</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>

              <div className="text-zinc-600 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FiMoreHorizontal className="shrink-0" />
                  <span>More signals</span>
                </div>
                <FiChevronRight className="shrink-0" />
              </div>
            </div>
          </div>

          <div className="border border-zinc-700 rounded-2xl p-2 sm:p-5 flex flex-col justify-between min-h-65 bg-[#101010]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase">
              <span className="text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md tracking-[0.2em] w-fit">Sahod week</span>
              <span className="text-zinc-500 normal-case tracking-normal">Fri, Apr 3</span>
            </div>

            <div className="mt-4">
              <p className="text-3xl sm:text-4xl font-semibold text-zinc-400">3.2<span className="text-2xl sm:text-3xl text-zinc-400">x</span></p>
              <p className="text-zinc-700 text-xs sm:text-sm">projected demand vs. a normal week</p>
            </div>

            <div className="relative h-20 sm:h-24 mt-4">
              <svg viewBox="0 0 320 96" className="w-full h-full overflow-visible">
                <path d="M 10 72 C 50 72, 82 68, 120 64 S 190 56, 228 50 S 282 38, 310 28" fill="none" stroke="#2dd4bf" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="310" cy="28" r="5.5" fill="#fbbf24" />
              </svg>
            </div>
          </div>

          <div className="border border-amber-400/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-60 bg-[#251f0f]">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4">
                <FiAlertTriangle className="shrink-0" />
                <span>StokAlerto caught this</span>
              </div>

              <p className="text-zinc-100 text-lg sm:text-xl font-semibold leading-snug max-w-md">
                At this pace, <span className="text-orange-400">Pancit Canton</span> runs out by Thursday. Order 30 more units before Friday.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
              <p className="text-zinc-500 text-xs sm:text-sm">8 left • sells ~11/day</p>

              <button className="bg-teal-400 text-black font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform w-full sm:w-auto">
                <FiShoppingCart className="shrink-0" />
                <span>Order 30</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  HeroCard