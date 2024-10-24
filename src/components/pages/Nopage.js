import { Link } from "react-router-dom";

function NoPage() {

    const styles = {
        container: {
            textAlign: 'center',
            marginTop: '100px',
            padding: '20px',
        },
        header: {
            fontSize: '72px',
            color: '#ff3333',
        },
        paragraph: {
            fontSize: '24px',
            color: '#333',
        },
        link: {
            fontSize: '18px',
            textDecoration: 'none',
            color: '#0066cc',
        },
    };

    return ( 

        

        <div style={styles.container}>
            <h1 style={styles.header}>404 - Page Not Found</h1>
            <p style={styles.paragraph}>The page you're looking for doesn't exist.</p>
            <Link to="/" style={styles.link}>
                Go back to Home
            </Link>
        </div>

     );

     
}

export default NoPage;