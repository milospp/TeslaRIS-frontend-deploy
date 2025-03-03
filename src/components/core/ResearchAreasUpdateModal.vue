<template>
    <v-row justify="start">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template #activator="scope">
                <div v-if="!readOnly" class="edit-pen">
                    <v-btn
                        icon variant="outlined"
                        color="grey-lighten" v-bind="scope.props" class="bottom-spacer"
                        :disabled="readOnly" size="small" v-on="scope.isActive">
                        <v-icon size="x-large" icon="mdi-file-edit-outline"></v-icon>
                    </v-btn>
                </div>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ $t("updateKeywordsLabel") }}</span>
                </v-card-title>
                <v-card-text>
                    <v-treeview
                        v-model:selected="selectedResearchAreas"
                        v-model:opened="openNodes"
                        :items="researchAreas"
                        select-strategy="independent"
                        item-title="title"
                        item-value="id"
                        selected-color="indigo"
                        selectable
                        :load-children="onNodeOpen"
                        @click:select="handleSelection"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="dialog = false">
                        {{ $t("closeLabel") }}
                    </v-btn>
                    <v-btn color="blue darken-1" @click="submitSelection">
                        {{ $t("updateLabel") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ResearchArea } from "@/models/OrganisationUnitModel";
import ResearchAreaService from "@/services/ResearchAreaService";
import { returnCurrentLocaleContent } from "@/i18n/MultilingualContentUtil";


export default defineComponent({
    name: "ResearchAreasUpdateModal",
    props: {
        readOnly: {
            type: Boolean,
            default: false
        },
        researchAreasHierarchy: {
            type: Object as PropType<ResearchArea[] | undefined>,
            required: true
        },
        limitOne: {
            type: Boolean,
            default: false
        }
    },
    emits: ["update"],
    setup(props, { emit }) {
        const dialog = ref(false);

        onMounted(async () => {
            buildInitialSelection();
        });

        const buildInitialSelection = () => {
            selectedResearchAreas.value = [];
            researchAreas.splice(0);

            ResearchAreaService.fetchChildResearchAreas(0).then(response => {
                response.data.forEach(researchAreaNode => {
                    researchAreas.push({ id: researchAreaNode.id, title: returnCurrentLocaleContent(researchAreaNode.name) as string, children: []});
                });

                props.researchAreasHierarchy?.forEach(researchArea => {
                    preSelectEverything(researchArea);
                });
            });
        }

        watch(dialog, () => {
            if (dialog.value) {
                buildInitialSelection();
            }
        })

        const preSelectEverything = async (researchArea: ResearchArea) => {
            if (selectedResearchAreas.value.find(researchAreaId => researchAreaId === researchArea.id)) {
                return;
            }

            selectedResearchAreas.value.push(researchArea.id as number);
            if (researchArea.superResearchArea) {
                await preSelectEverything(researchArea.superResearchArea);
            }

            const childrenResponse = await ResearchAreaService.fetchChildResearchAreas(researchArea.id as number);
            childrenResponse.data.forEach(researchAreaNode => {
                const node = findNodeById(researchAreas, researchArea.id as number);
                if (node) {
                    node.children.push({ id: researchAreaNode.id, title: returnCurrentLocaleContent(researchAreaNode.name) as string, children: [], superResearchAreaId: researchArea.id});
                }
            });
            
            openNodes.value.push(researchArea.id as number);
        };

        const findNodeById = (tree: Array<{ id: number; title: string; children: any[] }>, id: number): any => {
            for (const node of tree) {
                if (node.id === id) {
                    return node;
                }
                if (node.children && node.children.length > 0) {
                    const found = findNodeById(node.children, id);
                    if (found) return found;
                }
            }
            return null;
        };

        const unselectSubNodes = (tree: Array<{ id: number; title: string; children: any[] }>, id: number): void => {
            for (const node of tree) {
                if (node.id === id) {
                    const index = selectedResearchAreas.value.indexOf(node.id);
                    if (index !== -1) {
                        selectedResearchAreas.value.splice(index, 1);
                    }

                    if (node.children && node.children.length > 0) {
                        for (const child of node.children) {
                            unselectSubNodes(tree, child.id);
                        }
                    }
                    return;
                }

                if (node.children && node.children.length > 0) {
                    unselectSubNodes(node.children, id);
                }
            }
        };

        const openNodes = ref<number[]>([]);
        const selectedResearchAreas = ref<number[]>([]);
        const researchAreas = reactive<any[]>([]);

        const onNodeOpen = async (node: any) => {
            return ResearchAreaService.fetchChildResearchAreas(node.id).then(response => {
                if (response.data.length === 0) {
                    node.children = null;
                } else {
                    node.children = response.data.map(researchAreaNode => ({
                        id: researchAreaNode.id,
                        title: returnCurrentLocaleContent(researchAreaNode.name) as string,
                        children: [],
                        superResearchAreaId: node.id
                    }));
                }
            });
        };

        const selectParentHierarchy = (node: any) => {
            const index = selectedResearchAreas.value.indexOf(node.id);
            if (index == -1) {
                selectedResearchAreas.value.push(node.id);
            }

            if (node.superResearchAreaId) {
                const parentNode = findNodeById(researchAreas, node.superResearchAreaId);
                if (parentNode) {
                    selectParentHierarchy(parentNode);
                }
            }
        };

        const handleSelection = (event: any) => {
            if (!event.value) {
                unselectSubNodes(researchAreas, event.id);
            } else {
                if (props.limitOne) {
                    selectedResearchAreas.value.splice(0);
                }

                const node = findNodeById(researchAreas, event.id);
                if (node) {
                    selectParentHierarchy(node);
                }
            }
        };

        const findDeepestNodes = (ids: number[]): number[] => {
            const idSet = new Set(ids);
            const result = new Set<number>();

            function traverse(node: any): boolean {
                const isInIdSet = idSet.has(node.id);

                if (!node.children || node.children.length === 0) {
                    if (isInIdSet) {
                        result.add(node.id);
                    }
                    return isInIdSet;
                }

                let foundChildInIds = false;
                for (const child of node.children) {
                    foundChildInIds = traverse(child) || foundChildInIds;
                }

                if (isInIdSet && !foundChildInIds) {
                    result.add(node.id);
                }

                return isInIdSet || foundChildInIds;
            }

            for (const item of researchAreas) {
                traverse(item);
            }

            return Array.from(result);
        };

        const emitToParent = (researchAreaIds: number[]) => {
            emit("update", researchAreaIds)
            dialog.value = false;
        }

        const submitSelection = () => {
            emitToParent(findDeepestNodes([...new Set(selectedResearchAreas.value)]));
        };

        return {
            dialog, researchAreas, openNodes,
            selectedResearchAreas, handleSelection,
            submitSelection, onNodeOpen, emitToParent
        };
    }
});
</script>

<style scoped>

.vue3-treeselect__menu-container {
    width : 500px !important;
}

</style>
