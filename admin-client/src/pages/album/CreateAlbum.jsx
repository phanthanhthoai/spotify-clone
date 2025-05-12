import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Button, FileUpload, Input} from "@chakra-ui/react";
import {Save} from "lucide-react";
import FormInputField from "../../components/FormInputField.jsx";
import ArtistSelector from "../../components/ArtistSelector.jsx";
import {albumService} from "../../api/albumService.js";
import {toaster} from "../../components/ui/toaster.jsx";
import {useState} from "react";

export default function CreateAlbum() {
    const navigate = useNavigate();
    const validateForm = Yup.object({
        title: Yup.string().required("Vui lòng nhập tên album"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        cover_image: Yup.string().required("Vui lòng tải lên ảnh album"),
    });
    const [selectedArtistId, setSelectedArtistId] = useState();

    const initialValues = {
        title: "",
        description: "",
        cover_image: null
    }

    const onSubmit = async (values) => {
        values['releaseDate'] = '2025-01-01';
        values['artist'] = selectedArtistId;
        const response = await albumService.createAlbum(values);
        if (response.status === 200) {
            toaster.success({description: "Tạo album thành công!"});
            return;
        }

        toaster.error({description: response.message});
    }

    const selectArtist = (artistId) => {
        setSelectedArtistId(artistId);
    }


    return (
        <div>
            <Formik onSubmit={onSubmit} validationSchema={validateForm} initialValues={initialValues}>
                {({isSubmitting, setFieldValue}) => (
                    <Form>
                        <div className="flex justify-between">
                            <div className="text-2xl font-semibold">Tạo mới album</div>
                            <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                <Save/>
                                <span>Lưu</span>
                            </Button>
                        </div>

                        <div className="mt-5">
                            <div className="flex gap-3">
                                <div className="w-1/2">
                                    <FormInputField name="title" label="Tên album" placeholder="Nhập tên album"></FormInputField>
                                </div>

                                <div className="w-1/2">
                                    <FormInputField name="description" label="Mô tả" placeholder="Nhập mô tả"></FormInputField>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <div className="w-1/2">
                                <div className="font-semibold text-[15px] mb-1">Nghệ sĩ</div>
                                <ArtistSelector selectArtist={(artistId) => selectArtist(artistId)}/>
                            </div>

                            <div className="w-1/2">
                                <FileUpload.Root gap="1" onFileChange={(event) => setFieldValue('cover_image', event.acceptedFiles[0])}>
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
                    </Form>
                )}
            </Formik>
        </div>
    )
}