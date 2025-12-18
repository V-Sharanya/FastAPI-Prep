import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

function URLShortener() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch all URLs
    const fetchUrls = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/all`);
            setUrls(res.data);
        } catch (err) {
            console.error("Error fetching URLs:", err);
            setMessage("Failed to load URLs");
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    // Shorten URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl) return;

        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/shorten`, {
                original_url: originalUrl,
            });
            setMessage("URL shortened successfully!");
            setOriginalUrl("");
            fetchUrls();
        } catch (err) {
            console.error("Error shortening URL:", err);
            setMessage("Failed to shorten URL.");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    // Copy short URL
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setMessage("Copied to clipboard!");
        } catch {
            setMessage("Copy failed");
        }
        setTimeout(() => setMessage(""), 2000);
    };

    // Delete URL
    const deleteUrl = async (shortCode) => {
        if (!shortCode) {
            setMessage("Invalid URL ID");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this URL?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/${shortCode}`);
            setMessage("URL deleted successfully!");
            fetchUrls();
        } catch (err) {
            console.error("Delete error:", err);
            setMessage("Failed to delete URL.");
        } finally {
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="card shadow-lg p-4 border-0 rounded-4">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="url"
                        className="form-control form-control-lg"
                        placeholder="Enter a long URL..."
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                    />
                    <button
                        className="btn btn-primary px-4"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Shortening..." : "Shorten"}
                    </button>
                </div>
            </form>

            {message && (
                <div className="alert alert-info py-2 text-center">
                    {message}
                </div>
            )}

            <table className="table table-striped table-bordered mt-3">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                No URLs found.
                            </td>
                        </tr>
                    ) : (
                        urls.map((url, index) => (
                            <tr key={url.id}>
                                <td>{index + 1}</td>
                                <td
                                    className="text-truncate"
                                    style={{ maxWidth: "300px" }}
                                >
                                    <a
                                        href={url.original_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {url.original_url}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        href={url.short_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {url.short_url}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() =>
                                            copyToClipboard(url.short_url)
                                        }
                                    >
                                        Copy
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => deleteUrl(url.short_code)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default URLShortener;
