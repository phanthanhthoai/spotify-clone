import {useEffect, useState} from "react";
import {ButtonGroup, createListCollection, IconButton, Pagination, Portal, Select, Table} from "@chakra-ui/react";
import {artistService} from "../../api/artistService.js";
import {Link} from "react-router";
import {Plus} from "lucide-react";
import UpdateButton from "../../components/UpdateButton.jsx";
import DeleteButton from "../../components/DeleteButton.jsx";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {baseApiUrl} from "../../ultis/constants.js";

export default function Artist() {
    const [artistList, setArtistList] = useState([]);
    const [pagination, setPagination] = useState({page: 1, size: 5});
    const [paginationResult, setPaginationResult] = useState({totalElements: 0, totalPages: 0});
    const pageSizeOptions = createListCollection({
        items: [{label: '5 kết quả', value: 5}, {label: '10 kết quả', value: 10}, {label: '15 kết quả', value: 15}]
    });

    useEffect(() => {
        const fetchList = async () => {
            const response = await artistService.getListArtist({...pagination});
            if (response.status === 200 && response.data && response.data.items) {
                setArtistList(response.data.items);

                const {totalElements, totalPages} = response.data;
                setPaginationResult({totalElements, totalPages})
            }
        }

        fetchList();
    }, [pagination]);

    const onPageChange = (event) => {
        setPagination({...pagination, page: event.page})
    }

    const onPageSizeChange = (event) => {
        setPagination({...pagination, size: event.value})
    }

    const onUpdate = (artist) => {}

    const onDelete = (artist) => {}

    return (
        <div>
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Nghệ sĩ</div>
                <Link to="create">
                    <button className="button-dark flex gap-2 font-semibold cursor-pointer">
                        <Plus/>
                        <span>Tạo mới</span>
                    </button>
                </Link>
            </div>
            <div className="mt-3 app-table-container">
                {/*<Input/>*/}
                <Table.Root striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Mã</Table.ColumnHeader>
                            <Table.ColumnHeader>Tên nghệ sĩ</Table.ColumnHeader>
                            <Table.ColumnHeader>Ảnh đại diện</Table.ColumnHeader>
                            <Table.ColumnHeader>
                                <div className="flex justify-end">Chức năng</div>
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {artistList.map(artist => (
                            <Table.Row key={artist.id}>
                                <Table.Cell>#{artist.id}</Table.Cell>
                                <Table.Cell>{artist.name}</Table.Cell>
                                <Table.Cell>
                                    <div>
                                        <img src={`${baseApiUrl}/${artist.image}`} className="w-50px h-50px rounded-[5px] object-cover"/>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-end">
                                        <UpdateButton onUpdate={() => onUpdate(artist)}/>
                                        <DeleteButton onDelete={() => onDelete(artist)}/>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-3 items-center px-3">
                        <div>Hiển thị tối đa</div>
                        <Select.Root collection={pageSizeOptions} size="sm" width="120px" onValueChange={onPageSizeChange} defaultValue={[pageSizeOptions.firstValue]}>
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select framework" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {pageSizeOptions.items.map((item) => (
                                            <Select.Item item={item} key={item.value}>
                                                {item.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </div>

                    <div className="flex justify-end px-3 items-center">
                        <Pagination.Root onPageChange={onPageChange} count={paginationResult.totalElements} pageSize={pagination.size}>
                            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>

                                <Pagination.Items
                                    render={(page) => (
                                        <button className="pagination-button">{page.value}</button>
                                    )}
                                />

                                <Pagination.NextTrigger asChild>
                                    <IconButton>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </div>
                </div>
            </div>
        </div>
    )

}