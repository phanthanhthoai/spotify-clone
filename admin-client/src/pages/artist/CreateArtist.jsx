import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Button, FileUpload, Input} from "@chakra-ui/react";
import {Save} from "lucide-react";
import FormInputField from "../../components/FormInputField.jsx";
import FormTextareaField from "../../components/FormTextareaField.jsx";
import {artistService} from "../../api/artistService.js";
import {toaster} from "../../components/ui/toaster.jsx";

export default function CreateArtist() {
    const navigate = useNavigate();
    const validateForm = Yup.object({
        name: Yup.string().required("Vui lòng nhập tên nghệ sĩ"),
        image: Yup.mixed().required("Vui lòng tải lên hình ảnh"),
        description: Yup.string().required("Vui lòng nhập giới thiệu")
    })

    const initialValues = {
        name: ""
    }

    const onSubmit = async (values) => {
        const response = await artistService.createArtist(values);
        if (response.status === 200) {
            toaster.success({
                description: "Tạo nghệ sĩ thành công"
            });

            return;
        }

        toaster.error({description: response.message});
    }

    return (
        <div>
            <Formik onSubmit={onSubmit} validationSchema={validateForm} initialValues={initialValues}>
                {({isSubmitting, setFieldValue}) => (
                    <Form>
                        <div className="flex justify-between">
                            <div className="text-2xl font-semibold">Tạo mới nghệ sĩ</div>
                            <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                <Save/>
                                <span>Lưu</span>
                            </Button>
                        </div>

                        <div className="mt-5">
                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <FormInputField name="name" label="Tên nghệ sĩ" placeholder="Nhập tên nghệ sĩ"></FormInputField>
                                </div>

                                <div className="w-1/2">
                                    <FileUpload.Root gap="1" onFileChange={(event) => setFieldValue('image', event.acceptedFiles[0])}>
                                        <FileUpload.HiddenInput />
                                        <FileUpload.Label><div className="font-semibold text-[15px]">Ảnh đại diện</div></FileUpload.Label>
                                        <Input asChild>
                                            <FileUpload.Trigger>
                                                <FileUpload.FileText lineClamp={1}/>
                                            </FileUpload.Trigger>
                                        </Input>
                                    </FileUpload.Root>
                                </div>
                            </div>

                            <div className="w-1/2 mt-5">
                                <FormTextareaField name="description" label="Giới thiệu" placeholder="Nhập giới thiệu"></FormTextareaField>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}