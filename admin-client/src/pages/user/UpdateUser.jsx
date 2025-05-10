import {useParams} from "react-router";
import {useEffect, useState} from "react";
import userService from "../../api/userService.js";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Button, Spinner} from "@chakra-ui/react";
import {Save} from "lucide-react";
import FormInputField from "../../components/FormInputField.jsx";
import {toaster} from "../../components/ui/toaster.jsx";

export default function UpdateUser() {
    const param = useParams();
    const [user, setUser] = useState();
    const [initFormData, setInitFormData] = useState();

    const validateForm = Yup.object({
        lastName: Yup.string().required('Vui lòng nhập họ'),
        firstName: Yup.string().required('Vui lòng nhập tên'),
        email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
    });

    useEffect(() => {
        const fetchUser = async (id) => {
            const response = await userService.getUser(id);
            if (response.status === 200) {
                setUser(response.data);
                console.log(response.data);
            }
        }
        if (param.id) {
            fetchUser(param.id);
        }
    }, [param])

    useEffect(() => {
        setInitFormData(user);
    }, [user])

    const onSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true);
        const response = await userService.updateUser(user.id, values);
        setSubmitting(false);
        if (response.status === 200) {
            toaster.success({
                description: "Cập nhật thành công!"
            });

            setUser(response.data);
            return;
        }

        toaster.error({
            description: `Cập nhật thất bại: ${response.message}`
        });


    }


    return (
        <div>
            {initFormData && (
                <Formik initialValues={initFormData} onSubmit={onSubmit} validationSchema={validateForm}>
                    {({isSubmitting}) => (
                        <Form>
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">Cập nhật người dùng</div>
                                <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                    {isSubmitting ? <Spinner size="sm" /> : <Save/>}
                                    <span>Lưu</span>
                                </Button>
                            </div>

                            <div className="mt-5">
                                <div className="flex gap-3">
                                    <FormInputField name="lastName" label="Họ"
                                                    placeholder="Nhập họ người dùng"></FormInputField>
                                    <FormInputField name="firstName" label="Tên"
                                                    placeholder="Nhập tên người dùng"></FormInputField>
                                </div>

                                <div className="mt-5">
                                    <FormInputField name="email" label="Email" placeholder="Nhập email người dùng"/>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    )
}