<template>
    <v-container>
        <h1>{{ $t("notificationsLabel") }}</h1>

        <notification-list @performed-action="notifyUser($event)"></notification-list>
    
        <toast v-model="snackbar" :message="message" />
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificationList from '@/components/core/NotificationList.vue';
import { NotificationAction } from '@/models/Common';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import Toast from '@/components/core/Toast.vue';


export default defineComponent({
    name: "NotificationListVIew",
    components: {NotificationList, Toast},
    setup() {
        const i18n = useI18n();
        const snackbar = ref(false);
        const message = ref("");

        const notifyUser = (actionType: NotificationAction) => {
            switch(actionType) {
                case NotificationAction.APPROVE:
                    message.value = i18n.t("approvedSuccessfullyLabel");
                    break;
                case NotificationAction.REMOVE_FROM_PUBLICATION:
                    message.value = i18n.t("removedSuccessfullyLabel");
                    break;
            }

            snackbar.value = true;
        };

        return {
            notifyUser,
            message,
            snackbar
        };
    }
});
</script>
