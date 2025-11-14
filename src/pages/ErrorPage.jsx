const ErrorPage = () => {
    return (
        <div style={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            textAlign: "center",
            padding: "20px"
            }}>

            <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>404</h1>
            <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Page Not Found</h2>

            
        </div>
    );
};
export default ErrorPage;