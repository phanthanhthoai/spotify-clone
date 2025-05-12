import logo from "../../assets/images/icons/icon-spotify-gray.png";
import {Button} from "@chakra-ui/react";
import './auth-layout.scss';
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import FormInputField from "../../components/FormInputField.jsx";
import authService from "../../api/authService.js";
import {toaster} from "../../components/ui/toaster.jsx";

export default function Login() {
    const validateLoginForm = Yup.object({
        email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = async (values, {setSubmitting}) => {
        try {
            const response = await authService.login({email: values.email, password: values.password});
            if (response.status === 200 && response.data) {
                //Luu token vao localstorage
                localStorage.setItem("token", response.data.token);

                setTimeout(() => {
                    window.location.href = "/"
                }, 500)


                toaster.success({
                    description: "Đăng nhập thành công"
                });

                return;
            }

            toaster.error({
                description: response.message,
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
        <div className="auth-page page-container flex justify-center items-center">
            <div className="login-container w-2/5 p-10">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateLoginForm}>
                    {({isSubmitting}) => (
                        <Form className="w-full flex flex-col items-center">
                            <img src={logo} className="w-35px h-35px mt-5"/>
                            <div className="font-extrabold text-3xl mt-3">Đăng nhập vào Spotify</div>
                            <div className="mt-15 flex flex-col items-center w-3/5">
                                <div className="w-full">
                                    <FormInputField name="email" label="Email hoặc tên người dùng" placeholder="Email hoặc tên người dùng"/>
                                </div>
                                <div className="mt-5 w-full">
                                    <FormInputField name="password" label="Mật khẩu" placeholder="Mật khẩu" type="password"/>
                                </div>

                                <Button type="submit" className="mt-10 p-6 font-bold rounded-full w-full transform-scale" bg="green" color="black">
                                    {isSubmitting && "Đang đăng nhập..."}
                                    {!isSubmitting && "Đăng nhập"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}