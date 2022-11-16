const mapOpenLayersStyles: { [key: string]: React.CSSProperties } = {
    app: {
        textAlign: 'center',
        height: '100%',
        width: '100%',
    },
    appLabel: {
      width: '50%',
      overflow: 'auto',
      margin: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      background: 'white',
      pointerEvents: 'none',
    },
    mapContainer: {
      height: '60vh',
      width: '100%',
    },
    clickedCoordLabel: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      background: 'white',
      borderRadius: '5px',
    },
    clickedCoordLabelP: {
      margin: '10px',
    }      
};

export default mapOpenLayersStyles