
import Generic1 from './Generic1';
import  Generic2 from './Generic2';
import { useAppSelector } from '../../redux/hooks';
const index = () => {
  const data = useAppSelector((state)=>{return state.widget.genericType})
  return (
    <div className=''>
      {data==="generic1"?<Generic1/>:<Generic2/>}
    </div>
  )
}

export default index