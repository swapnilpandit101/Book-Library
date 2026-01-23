import { useState, useEffect } from 'react';

const BookForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        email: '',
        pageCount: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form if no initial data (Add mode from fresh)
            setFormData({
                title: '',
                author: '',
                publisher: '',
                publishedDate: '',
                email: '',
                pageCount: '',
                description: ''
            })
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.publishedDate) newErrors.publishedDate = 'Date is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email id is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (formData.pageCount && !Number.isInteger(Number(formData.pageCount))) {
            newErrors.pageCount = 'Pages must be an integer';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div className="form-body">
                <div className="form-group">
                    <label>Title <span className="required-asterisk">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <small className="error-msg">{errors.title}</small>}
                </div>

                <div className="form-group">
                    <label>Author <span className="required-asterisk">*</span></label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={errors.author ? 'error' : ''}
                    />
                    {errors.author && <small className="error-msg">{errors.author}</small>}
                </div>

                <div className="form-group">
                    <label>Publisher</label>
                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Published Date <span className="required-asterisk">*</span></label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        className={errors.publishedDate ? 'error' : ''}
                    />
                    {errors.publishedDate && <small className="error-msg">{errors.publishedDate}</small>}
                </div>

                <div className="form-group">
                    <label>Owner Email <span className="required-asterisk">*</span></label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="owner@example.com"
                    />
                    {errors.email && <small className="error-msg">{errors.email}</small>}
                </div>

                <div className="form-group">
                    <label>Pages</label>
                    <input
                        type="number"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleChange}
                        className={errors.pageCount ? 'error' : ''}
                    />
                    {errors.pageCount && <small className="error-msg">{errors.pageCount}</small>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

            </div>

            <div className="form-actions">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                )}
                <button type="submit" className="btn btn-primary">Save Book</button>
            </div>
        </form>
    );
};

export default BookForm;
