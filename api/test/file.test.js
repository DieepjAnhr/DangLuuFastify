const axios = require('axios');

jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({ data: {
        "status": "successs",
        "message": "Success!",
        "data": [
            {
                "id": 3,
                "title": "Tiêu đề 1",
                "content": "Nội dung 1"
            }
        ]
    }})
}));

test('mock axios.get', async () => {
    const response = await axios.get('http://localhost:3000/api/posts');
    expect(response.data).toEqual({
        "status": "successs",
        "message": "Success!",
        "data": [
            {
                "id": 3,
                "title": "Tiêu đề 1",
                "content": "Nội dung 1"
            },
            {
                "id": 2,
                "title": "Tiêu đề 2",
                "content": "Nội dung 2"
            }
        ]
    });
});