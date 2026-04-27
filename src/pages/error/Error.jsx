import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)'
        }}>
            <h1 style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-light)',
                color: 'var(--color-text-secondary)'
            }}>404</h1>
            <p style={{
                fontSize: 'var(--font-size-2xl)',
                color: 'var(--color-text-secondary)',
                textAlign: 'center'
            }}>Página no encontrada</p>
            <Link to="/" style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-primary)',
                textDecoration: 'underline',
                marginTop: 'var(--spacing-md)'
            }}>
                Volver al inicio
            </Link>
        </div>
    );
}