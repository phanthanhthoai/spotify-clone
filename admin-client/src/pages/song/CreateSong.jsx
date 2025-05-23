import {Form, Formik} from "formik";
import {Button, FileUpload, Input} from "@chakra-ui/react";
import {Save} from "lucide-react";
import FormInputField from "../../components/FormInputField.jsx";
import * as Yup from "yup";
import SongService from "../../api/songService.js";
import {toaster} from "../../components/ui/toaster.jsx";
import {useNavigate} from "react-router";

export default function CreateSong() {
    const navigate = useNavigate();
    const validateForm = Yup.object({
        title: Yup.string().required("Vui lòng nhập tiêu đề"),
        image: Yup.mixed().required("Vui lòng chọn hình ảnh"),
        file: Yup.mixed().required("Vui lòng chọn file âm thanh")
    });
    const initialValues = {
        title: '',
        file: null,
        image: null
    }


    const onSubmit = async (values, {setSubmitting}) => {
        values['release_date'] = '2025-01-01';
        const response = await SongService.createSong(values);
        if (response.status === 200) {
            toaster.success({description: "Tạo bài hát thành công!"});
            navigate('/song');
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
                            <div className="text-2xl font-semibold">Tạo mới bài hát</div>
                            <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                <Save/>
                                <span>Lưu</span>
                            </Button>
                        </div>

                        <div className="mt-5">
                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <FormInputField name="title" label="Tiêu đề bài hát" placeholder="Nhập tiêu đề bài hát"></FormInputField>
                                </div>

                                <div className="w-1/2">
                                    <FileUpload.Root gap="1" onFileChange={(event) => setFieldValue('image', event.acceptedFiles[0])}>
                                        <FileUpload.HiddenInput />
                                        <FileUpload.Label><div className="font-semibold text-[15px]">Hình ảnh</div></FileUpload.Label>
                                        <Input asChild>
                                            <FileUpload.Trigger>
                                                <FileUpload.FileText lineClamp={1}/>
                                            </FileUpload.Trigger>
                                        </Input>
                                    </FileUpload.Root>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-5">
                                <div className="w-1/2">
                                    <FileUpload.Root gap="1" onFileChange={(event) => setFieldValue('file', event.acceptedFiles[0])}>
                                        <FileUpload.HiddenInput />
                                        <FileUpload.Label><div className="font-semibold text-[15px]">Tệp âm thanh</div></FileUpload.Label>
                                        <Input asChild>
                                            <FileUpload.Trigger>
                                                <FileUpload.FileText lineClamp={1}/>
                                            </FileUpload.Trigger>
                                        </Input>
                                    </FileUpload.Root>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}