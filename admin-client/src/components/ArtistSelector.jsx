import {useEffect, useState} from "react";
import {Avatar, createListCollection, HStack, Select, useSelectContext} from "@chakra-ui/react";
import {artistService} from "../api/artistService.js";
import {baseApiUrl} from "../ultis/constants.js";

export default function ArtistSelector({selectArtist}) {
    const [artistList, setArtistList] = useState([]);
    const [options, setOptions] = useState();

    useEffect(() => {
        const fetchList = async () => {
            const response = await artistService.getListArtist({page: 1, size: 20});
            if (response.status === 200 && response.data && response.data.items) {
                setArtistList(response.data.items);
            }
        }

        fetchList();
    }, []);

    useEffect(() => {
        const items = [];
        artistList.map(artist => {
            items.push({
                id: artist.id,
                name: artist.name,
                image: artist.image
            })
        });

        setOptions(createListCollection({
            items: items,
            itemToString: (item) => item.name,
            itemToValue: (item) => item.id,
        }))
    }, [artistList])

    const onChange = (value) => {
        selectArtist(value.value[0]);
    }

    return (
        (options && (
            <Select.Root
                onValueChange={onChange}
                collection={options}
                size="sm"
                width="100%"
                positioning={{ sameWidth: true }}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger>
                        <SelectValue />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        {options.items.map((item) => (
                            <Select.Item item={item} key={item.id} justifyContent="flex-start">
                                <div className="flex gap-3 items-center font-semibold">
                                    <img src={`${baseApiUrl}/${item.image}`} className="h-30px w-30px rounded-[2px] object-cover"/>
                                    <div>{item.name}</div>
                                </div>

                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        ))
    )
}

const SelectValue = () => {
    const select = useSelectContext()
    const items = select.selectedItems;
    const { name, image } = items && items.length > 0 ? items[0] : {name: null, image: null};
    return (
        (items.length > 0 ?
            <div className="border text-gray-400 font-semibold p-2 w-full rounded-[6px]">
                <Select.ValueText>
                    <HStack>
                        <div className="flex gap-3 items-center font-semibold">
                            <img src={`${baseApiUrl}/${image}`} className="h-30px w-30px rounded-[2px] object-cover"/>
                            <div>{name}</div>
                        </div>
                    </HStack>
                </Select.ValueText>
            </div>
        : <div className="border text-gray-400 font-semibold p-3 w-full rounded-[6px]" style={{borderColor: "#99a1af"}}>Chọn nghệ sĩ</div>)
    )
}