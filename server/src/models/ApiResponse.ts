/** @format */

interface MyResponse<T>{
	success: boolean;
	data: T;
}
type ApiResponse<T>=Promise<MyResponse<T>>;
export default ApiResponse;