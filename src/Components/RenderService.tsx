import { Service } from '../types';

const RenderService = ({ service }: { service: Service }) => (
  <div className='service' key={service.id}>
    {/* <div className='top'>
      <div className='img-box'></div>
    </div> */}
    <div className='bottom'>
      <p>{service.title}</p>
    </div>
  </div>
);

export default RenderService;
