import './Card.css'

const Card = ({data}: any) => {

  console.log(data);

  return (
    <div className="shadow-md w-80 p-1 m-2 float-left border-solid border border-black rounded">
        <div className='flex justify-center'>
          <img src={data.thumbnail} alt="Item's thumbnail" className='shadow-md max-h-52'/>
        </div>
        <div className='flex justify-between'>
          <span>{data.name}</span>
          <span className='text-gray-500'>{data.group}</span>
        </div>
        <div className='flex justify-between'>
          <button onClick={() => {alert('Stop clicking stuff... 😞😞😞');} }><u>Buy</u> -&gt; ${data.cost}</button>
          <span className='text-gray-500'>{data.quantity} pcs.</span>
        </div>
    </div>
  );
};

export default Card
