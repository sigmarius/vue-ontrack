import { ref } from "vue";
import { PAGE_TIMELINE } from "@/constants";
import { isPageValid } from "@/validators";

export const currentPage = ref(normalizePageHash());

export const timelineRef = ref();

export function normalizePageHash() {
  const page = window.location.hash.slice(1);

  if (
    isPageValid(page)
  ) {
    return page;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

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
