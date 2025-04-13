import * as Yup from "yup";
import {Form, Formik} from "formik";
import logo from "../../assets/images/icons/icon-spotify-gray.png";
import FormInputField from "../../common/components/FormInputField.jsx";
import {Button} from "@chakra-ui/react";
import authService from "../../api/authService.js";
import {toaster} from "../../components/ui/toaster.jsx";

export default function Register() {
    const validateLoginForm = Yup.object({
        email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu yêu cầu tối thiểu 6 ký tự")
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit =  async (values, {setSubmitting}) => {
        try {
            const response = await authService.register({email: values.email, password: values.password});
            if (response.status === 200 && response.data) {
                setTimeout(() => {
                    window.location.href = "/auth";
                }, 1000)

                toaster.success({
                    description: "Đăng ký tài khoản thành công!"
                });

                return;
            }

            toaster.error({
                description: response.message
            })
        } catch (error) {

            toaster.error({
                description: error.message,
                type: "error",
            })
        } finally {

            setSubmitting(false);
        }
    }

    return (
        <div className="w-screen h-screen bg-stone-950 register-container flex justify-center p-20">
            <div className="w-500px">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateLoginForm}>
                    {({isSubmitting}) => (
                        <Form className="w-full flex flex-col items-center">
                            <img src={logo} className="w-40px h-40px mt-5"/>
                            <div className="font-extrabold text-5xl/15 mt-3 text-center">Đăng ký Spotify để bắt đầu nghe</div>
                            <div className="mt-15 flex flex-col items-center w-full">
                                <div className="w-full">
                                    <FormInputField name="email" label="Email hoặc tên người dùng" placeholder="Email hoặc tên người dùng"/>
                                </div>
                                <div className="mt-5 w-full">
                                    <FormInputField name="password" label="Mật khẩu" placeholder="Mật khẩu" type="password"/>
                                </div>

                                <Button type="submit" className="mt-10 p-6 font-bold rounded-full w-full transform-scale" bg="green" color="black">
                                    {isSubmitting && "Đang đăng ký..."}
                                    {!isSubmitting && "Đăng ký"}
                                </Button>

                                <div className="mt-10 text-gray-300 font-semibold">Bạn đã có tài khoản?
                                    <a href="/auth" className="text-white underline"> Đăng nhập tại đây</a>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}