import React from "react";

export default function Contact() {
    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Contact Me</h2>
            <p className="text-muted text-center">
                Feel free to reach out to me through any of the following platforms:
            </p>
            <div className="mt-4 text-center">
                <ul className="list-unstyled">
                    <li className="mb-3">
                        <strong>Email:</strong>{" "}
                        <a href="mailto:jeffzokoua05@gmail.com" className="text-primary">
                            jeffzokoua05@gmail.com
                        </a>
                    </li>
                    <li className="mb-3">
                        <strong>GitHub:</strong>{" "}
                        <a
                            href="https://github.com/therealbeauideal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            https://github.com/therealbeauideal
                        </a>
                    </li>
                    <li className="mb-3">
                        <strong>LinkedIn:</strong>{" "}
                        <a
                            href="https://www.linkedin.com/in/therealbeauideal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            https://www.linkedin.com/in/therealbeauideal/
                        </a>
                    </li>
                    <li className="mb-3">
                        <strong>Instagram:</strong>{" "}
                        <a
                            href="https://www.instagram.com/therealbeauideal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            https://www.instagram.com/therealbeauideal/
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}