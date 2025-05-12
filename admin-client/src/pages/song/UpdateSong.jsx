import { Button, FileUpload, Input, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import SongService from "../../api/songService.js";
import FormInputField from "../../components/FormInputField.jsx";
import { toaster } from "../../components/ui/toaster.jsx";



export default function UpdateSong() {
     const param = useParams();
     const [song, setSong] = useState();
     const [initFormData, setInitFormData] = useState();

     const validateForm = Yup.object({
          title: Yup.string().required("Vui lòng nhập tiêu đề"),
          image: Yup.mixed().required("Vui lòng chọn hình ảnh"),
          file: Yup.mixed().required("Vui lòng chọn file âm thanh"),
     });
     useEffect(() => {
          const fetchSong = async (id) => {
               const response = await SongService.getSong(id);
               console.log(response.data);
               if (response.status === 200) {
                    console.log("Dữ liệu nhận được:", response.data);
                    setSong(response);
               }
          }
          if (param.id) {
               fetchSong(param.id);
          }
     }, [param])

     useEffect(() => {
          setInitFormData(song);
     }, [song])

     const onSubmit = async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await SongService.updateSong(song.id, values);
          setSubmitting(false);
          if (response.status === 200) {
               toaster.success({
                    description: "Cập nhật thành công!"
               });

               setSong(response.data);
               return;
          }

          toaster.error({
               description: `Cập nhật thất bại: ${response.message}`
          });


     }

     return (
          <div>
               {initFormData && (
                    <Formik
                         initialValues={initFormData}
                         enableReinitialize
                         onSubmit={onSubmit}
                         validationSchema={validateForm}
                    >
                         {({ isSubmitting, setFieldValue }) => (
                              <Form>
                                   <div className="flex justify-between">
                                        <div className="text-2xl font-semibold">Cập nhật bài hát</div>
                                        <Button className="button-dark flex gap-2 font-semibold cursor-pointer" type="submit">
                                             {isSubmitting ? <Spinner size="sm" /> : <Save />}
                                             <span>Lưu</span>
                                        </Button>
                                   </div>

                                   <div className="mt-5">
                                        <FormInputField
                                             name="title"
                                             label="Tiêu đề bài hát"
                                             placeholder="Nhập tiêu đề bài hát"
                                        />

                                        <div className="mt-5">
                                             <FileUpload.Root
                                                  gap="1"
                                                  onFileChange={(event) =>
                                                       setFieldValue("image", event.acceptedFiles[0])
                                                  }
                                             >
                                                  <FileUpload.HiddenInput />
                                                  <FileUpload.Label>
                                                       <div className="font-semibold text-[15px]">Hình ảnh</div>
                                                  </FileUpload.Label>
                                                  <Input asChild>
                                                       <FileUpload.Trigger>
                                                            <FileUpload.FileText lineClamp={1} />
                                                       </FileUpload.Trigger>
                                                  </Input>
                                             </FileUpload.Root>
                                        </div>

                                        <div className="mt-5">
                                             <FileUpload.Root
                                                  gap="1"
                                                  onFileChange={(event) =>
                                                       setFieldValue("file", event.acceptedFiles[0])
                                                  }
                                             >
                                                  <FileUpload.HiddenInput />
                                                  <FileUpload.Label>
                                                       <div className="font-semibold text-[15px]">Tệp âm thanh</div>
                                                  </FileUpload.Label>
                                                  <Input asChild>
                                                       <FileUpload.Trigger>
                                                            <FileUpload.FileText lineClamp={1} />
                                                       </FileUpload.Trigger>
                                                  </Input>
                                             </FileUpload.Root>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               )}
          </div>
     );
}
