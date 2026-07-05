export default function Overview() {
  return (
    <div className="h-full">
      <div className=" px-11 pt-8 pb-3">
        <h2 className="text-4xl font-bold text-black ml-50">
          Good Morning! User
        </h2>
        <p className="text-lg text-black ml-51 ">Here's what's moving in you store this week.</p>
      </div>
      
      <div className="grid grid-cols-3 pl-70 pr-10 gap-5 items-center h-40 bg-linear-to-t from-pink-400/50 via-pink-300/50 to-zinc-100 relative overflow-visible">
        <img
          src="src/assets/welcome.png"
          alt="pig"
          className="w-70 h-auto absolute left-3 bottom-0 drop-shadow-xl z-10"
        />
        {/* <div className="grid grid-cols-3 ml-70 gap-5"> */}
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>48</h2>
            <p className='text-lg'>ITEMS TRACKED</p>
          </div>
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>3</h2>
            <p className='text-lg'>NEED REORDER</p>
          </div>
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>45</h2>
            <p className='text-lg'>HEALTHY STOCK</p>
          </div>
        {/* </div> */}
      </div>
      <div>
        <h1 className="">asass</h1>

      </div>
    </div>
  );
}