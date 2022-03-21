import { increment, decrement, incrementByAmount } from '../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const Counter = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
      <div className="items-center justify-center h-screen flex flex-col ">
        <span className="p-4 text-6xl">{count}</span>
        <button
          type="button"
          className="w-20 bg-orange-300 p-2"
          onClick={() => dispatch(increment())}
        >+
        </button>
        <button type="button" className="w-20 bg-orange-300 p-2 mt-2" onClick={() => dispatch(decrement())}>-</button>
        <button type="button" className="w-20 bg-orange-300 p-2 mt-2" onClick={() => dispatch(incrementByAmount(5))}>increment by 5</button>

      </div>
    );
};
export default Counter;
