export default function Choices(props) {
    return (
        <main className="welcome-home w-full h-screen absolute top-0 z-20 bg-gray-700/50 flex
        flex-col justify-center items-center">
            <section className="choice-section bg-white w-2/5 h-[235px] rounded-xl mt-10 flex flex-col items-center
            py-5 gap-8 z-20 max-sm:w-4/5">
                <h2 className="choices text-black text-3xl font-medium">Choose Your Turn: </h2>
                <div className="options w-full flex justify-evenly">
                    <div className="choice">
                        <button className="hover:cursor-pointer" 
                        onClick={() => props.onselect('paper')}>
                            <i className="fa-solid fa-hand text-(--icon-color) text-6xl"></i>
                            <p className="rock-text text-black text-lg font-semibold">Paper</p>
                        </button>
                    </div>
                <div className="choice">
                    <button className="hover:cursor-pointer" 
                    onClick={() => props.onselect('scissors')}>
                        <i className="fa-solid fa-hand-scissors fa-rotate-90 text-(--icon-color) text-6xl"></i>
                        <p className="paper-text text-black text-lg font-semibold">Scissor</p>
                    </button>
                </div>
                <div className="choice">
                    <button className="hover:cursor-pointer" 
                    onClick={() => props.onselect('rock')}>
                        <i className="fa-solid fa-hand-fist text-(--icon-color) text-6xl"></i>
                        <p className="scissor-text text-black text-lg font-semibold">Rock</p>
                    </button>
                </div>
            </div>
             </section>
        </main>
        
    )
}