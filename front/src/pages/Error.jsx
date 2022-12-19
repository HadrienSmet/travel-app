import backgroundImg from '../assets/images/erreur-404-illu.webp';

const Error = () => {
    return (
        <main className='error-page'>
            <div className="error-page__content">
                <h1>Cette fonctionnalité n'a malheureusement pas encore pu être codée.</h1>
                <img src={backgroundImg} alt="Illustration d'une erreur 404" />
            </div>
        </main>
    );
};

export default Error;