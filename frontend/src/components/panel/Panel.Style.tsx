const panelStyles: { [key: string]: React.CSSProperties } = {
    panel: {
        padding: 5,
        textAlign: 'center',
        height: '100%',
        width: '100%',
        minHeight: 600,
        minWidth: 500,
        fontFamily: 'poppins',
        borderRadius: '40px 40px 40px 40px',
        boxShadow: '3px 3px 5px 5px rgba(0, 0, 0, 0.07), 3px 3px 5px 5px rgba(0, 0, 0, 0.05)',
    },
    title:{
        paddingRight: 20,
        fontWeight: '900',
        color: '#616462',
        paddingBottom: 10
    },
    subtitle: {
        paddingBottom: 10
    },
    panelContent: {
        paddingBottom: 30,
        paddingTop: 30,
        overflowX: 'scroll',
        overflowY: 'scroll',
        //maxHeight: 300,
        //maxWidth: 450,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        textAlign: 'center'
    },
    panelTitle: {
        fontFamily: 'poppins',
        borderRadius: '40px 40px 0px 0px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        fontSize: '16px',
        letterSpacing:0,
        fontWeight: '900',
        color: 'white',
        textTransform: 'uppercase',
        height: 80,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 30,
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#E74C3C',
        borderRadius: 40,
        height: 50,
    },
    panelButton: {
        position: 'absolute',
        bottom:0,
        paddingBottom: 40,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonText: {
        fontSize: '14px',
        letterSpacing:0,
        lineHeight: 36,
        fontWeight: 'bold'
    },
    contentTitle:{
        display: 'flex',
        flexDirection: "column",
        textAlign: 'left',
        marginLeft: 30,
        width: '40%'
    },
    contentData: {
        display: 'flex',
        flexDirection: "column",
        textAlign: 'left',
        marginRight: 30,
        width: '50%'
    }
};

export default panelStyles;