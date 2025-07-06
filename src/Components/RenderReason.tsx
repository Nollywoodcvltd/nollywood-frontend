const RenderReason = ({ reason, index }: { reason: string; index: number }) => (
  <div className='reason' key={index}>
    <div className='bullet'>
      <div className='circle'></div>
    </div>
    <div className='text'>
      <p>{reason}</p>
    </div>
  </div>
);

export default RenderReason;
