import ApiResponse from '../../../src/presentation/response-handling/api-response';


describe('ApiResponse', () => {
    // Test the constructor
    it('should create an ApiResponse object', () => {
        const statusCode = 200;
        const message = 'Success';
        const data = JSON.stringify({ foo: 'bar' });

        const response = new ApiResponse(statusCode, message, data);

        expect(response.statusCode).toBe(statusCode);
        expect(response.message).toBe(message);
        expect(response.message).toBeTruthy();
        expect(response.data).toBe(data);
    });

    it('should create an ApiResponse object with success=false when status code is not in the success range', () => {
        const statusCode = 404;
        const message = 'Not Found';

        const response = new ApiResponse(statusCode, message);

        expect(response.success).toBe(false);
    });

    // Test the toJson() method
    it('toJson() should return the ApiResponse as JSON', () => {
        const statusCode = 200;
        const message = 'Success';
        const data = { foo: 'bar' };

        const response = new ApiResponse(statusCode, message, data);

        const expectedJson = {
            status: statusCode,
            message,
            success: true,
            data,
        };

        expect(response.toJson()).toEqual(expectedJson);
    });

    it('toJson() should return the ApiResponse without the "data" property if data is null', () => {
        const statusCode = 200;
        const message = 'Success';

        const response = new ApiResponse(statusCode, message);

        const expectedJson = {
            status: statusCode,
            message,
            success: true,
        };

        expect(response.toJson()).toEqual(expectedJson);
    });
});