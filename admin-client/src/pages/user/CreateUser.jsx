import {Link} from "react-router";
import {Plus, Save} from "lucide-react";
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import FormInputField from "../../components/FormInputField.jsx";
import userService from "../../api/userService.js";
import {Button} from "@chakra-ui/react";
import {toaster} from "../../components/ui/toaster.jsx";

export default function CreateUser() {
    const validateForm = Yup.object({
        lastName: Yup.string().required('Vui lòng nhập họ'),
        firstName: Yup.string().required('Vui lòng nhập tên'),
        email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
    });

    const initFormValue = {
        email: ''
    }

    const onSubmit = async (values, {setSubmitting}) => {
        const response = await userService.createUser(values);
        if (response.status === 200) {
            toaster.success({
                description: "Tạo mới thành công"
            })

            return;
        }

        toaster.error({
            description: `Tạo thất bại: ${response.message}`
        })
    }

    return (
        <div>
            <Formik initialValues={initFormValue} onSubmit={onSubmit} validationSchema={validateForm}>
                {({isSubmitting}) => (
                    <Form>
                        <div className="flex justify-between">
                            <div className="text-2xl font-semibold">Tạo mới người dùng</div>
                            <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                <Save/>
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
        </div>
    )
}