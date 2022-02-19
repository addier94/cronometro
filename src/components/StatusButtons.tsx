interface PropsBtn {
    text:string,
    color: string,
    click: () => void
}
const Btn: React.FC<PropsBtn> = ({ text, color, click }:PropsBtn) => (
  <button
    type="button"
    className={`px-3 py-4 ${color} rounded-md border-2 border-black`}
    onClick={click}
  >
    {text}
  </button>
);

interface IProps {
  status: number,
  startTimer: () => void,
  stop: () => void,
  reset: () => void,
}

const StatusButtons:React.FC<IProps> = ({ status, startTimer, stop, reset }:IProps) => {
  console.log(status);
  return (
    <footer className="flex justify-between px-4 text-3xl">
      {status === 0 && <Btn text="start" color="bg-green-400" click={startTimer} /> }
      {status === 1 && <Btn text="pause" color="bg-green-500" click={stop} /> }
      {status === 2 && <Btn text="renude" color="bg-green-500" click={startTimer} /> }

      <Btn text="Claro" color="bg-red-600" click={reset} />
    </footer>
  );
};

export default StatusButtons;
