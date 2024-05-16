const About = () => {
    return <>
        <div className="m-3">
            <h2 className="text-center">Description of URL Shortener Algorithm</h2>
            <br />
            <div className="about-content">
                <p>
                    There is an API with an endpoint api/shorturl (POST) that receives requests with URLs that need to be shortened.
                    A key is generated for each URL and this key will be the shortened link to the URL.
                    The API saves the URL and the randomly generated key in a database. <br />
                    <br />
                    Example: <br />
                    URL: <a href="https://www.google.com.ua/">https://www.google.com.ua/</a> <br />
                    RandomKey: K0a7Vz7COWVaQ5YN <br />
                    ShortURL: <a href="http://localhost:3000/K0a7Vz7COWVaQ5YN">http://localhost:3000/K0a7Vz7COWVaQ5YN</a>
                </p>
                <hr />
                <p>
                    When a user clicks on the shortened link, the API maps the request to the MapFallback() method if the endpoint cannot be found. In this method, the API checks if the randomly generated key exists in the database and what URL is associated with it. If the URL is found, the API redirects the user to the corresponding URL. If the URL is not found, an error message is returned.
                </p>
                <h4>Steps:</h4>
                <ol>
                    <li>Create an API with an endpoint api/shorturl (POST) to receive URLs to be shortened.</li>
                    <li>Generate a random key for each URL received.</li>
                    <li>Save the URL and key in a database.</li>
                    <li>Return the shortened URL to the user.</li>
                    <li>When a user clicks on the shortened URL, map the request to the MapFallback() method.</li>
                    <li>Check if the randomly generated key exists in the database and retrieve the associated URL.</li>
                    <li>If the URL is found, redirect the user to the corresponding URL.</li>
                    <li>If the URL is not found, return an error message.</li>
                </ol>
            </div>
        </div>
    </>
};

export default About;