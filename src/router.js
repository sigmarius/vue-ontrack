import { ref } from "vue";
import { normalizePageHash } from "@/functions";
import { PAGE_TIMELINE } from "@/constants";

export const currentPage = ref(normalizePageHash());

export const timelineRef = ref();

export function navigate(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {

    // доступ предоставлен в компоненте TheTimeline через макрос defineExpose()
    timelineRef.value.scrollToHour();
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  // обновление значения реактивной переменной происходит через value
  currentPage.value = page;
}
