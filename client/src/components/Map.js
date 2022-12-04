import { forwardRef } from "react";

const Map = forwardRef((_, ref) => {

   return <div style={{ gridArea: 'map', height: '100%', width: '100%' }} ref={ref} />
});

export default Map;