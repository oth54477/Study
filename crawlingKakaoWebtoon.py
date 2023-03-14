from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep
from PIL import Image
import requests
import json
import webtoon




driver = webdriver.Chrome("./chromedriver")
driver.implicitly_wait(10)
# 카카오
week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "complete"]

driver.get('https://webtoon.kakao.com/original-webtoon?tab=mon')
kakao_base_url = 'https://webtoon.kakao.com'

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
urls = soup.select('#root > main > div > div > div.px-11.mx-auto.my-0.w-full.lg\:w-default-max-width.md\:w-\[490px\] > div.flex.flex-col.gap-4 > div.flex.flex-wrap.gap-4.content-start > div > div > div > a')
# 인물만 뽑기
images = soup.select('#root > main > div > div.page.bg-background.activePage > div.px-11.mx-auto.my-0.w-full.lg\:w-default-max-width.md\:w-\[490px\] > div.flex.flex-col.gap-4 > div.flex.flex-wrap.gap-4.content-start > div > div > div > a > picture:nth-child(2) > img')
# 배경, 인물 같이 뽑기
# images = soup.select('#root > main > div > div.page.bg-background.activePage > div.px-11.mx-auto.my-0.w-full.lg\:w-default-max-width.md\:w-\[490px\] > div.flex.flex-col.gap-4 > div.flex.flex-wrap.gap-4.content-start > div > div > div > a > picture > img')



url_arr = list(map(lambda x: x["href"], urls))
images_arr = list(map(lambda x: x["src"], images))
# images_arr = [image["src"] for image in images]
# print(images_arr)
urls_and_images = tuple(zip(url_arr, images_arr))
# print(urls_and_images)
# name_and_img_html = soup.select('#root > main > div > div > div.px-11.mx-auto.my-0.w-full.lg\:w-default-max-width.md\:w-\[490px\] > div.flex.flex-col.gap-4 > div.flex.flex-wrap.gap-4.content-start > div > div > div > a > div.w-full.absolute.left-0.bottom-10.flex-center.flex-col > picture > img')

for url, image in urls_and_images:
    webtoon_info = webtoon.Webtoon()
    webtoon_url = kakao_base_url + url
    driver.implicitly_wait(3)
    driver.get(webtoon_url)
    # sleep(5)
    idx = url.find("/", -5)
    webtoon_info.webtoon_id = url[idx+1:]
    
    sleep(1)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    #TODO 수정 필요
    webtoon_info.total_ep = soup.select_one('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > ul > li:nth-child(1) > a > div.px-8.pt-9.pb-8.h-46 > p')
    
    
    click_here = driver.find_element(By.XPATH, '//*[@id="root"]/main/div/div/div/div[1]/div[2]/div[1]/div[1]/div[4]/div[2]/div').click()
    sleep(1)



    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    webtoon_info.status = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > div.flex.flex-wrap > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.font-badge.\!whitespace-nowrap.rounded-5.s10-bold-white.bg-dark-red.px-4').string.strip()
    days = soup.select('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > div.flex.flex-wrap > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.font-badge.\!whitespace-nowrap.rounded-5.s10-bold-black.bg-white.px-4')
    webtoon_info.day_arr = [day.string.strip() for day in days]
    webtoon_info.name = soup.select_one('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > p').string.strip()
    webtoon_info.authors_arr = [
        soup.select_one('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > dl > div:nth-child(1) > dd').string.strip(),
        soup.select_one('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > dl > div:nth-child(2) > dd').string.strip()
        ]
    webtoon_info.plot = soup.select_one('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > div:nth-child(4) > div:nth-child(2) > p').string.strip()
    genres = soup.select('#root > main > div > div.page.bg-background-02.activePage > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.relative.z-1.h-full > div > div > div.swiper-slide.swiper-no-swiping.swiper-slide-active > div > div.relative.h-full > div > div > div.swiper-slide.swiper-slide-active > div > div > div > div > div:nth-child(5) > div.flex.flex-wrap.-mt-12 > a > p')
    webtoon_info.genre_arr = [genre.string.strip() for genre in genres]
    
    
    webtoon_info.image = image
    webtoon_info.webtoon_url = url
    # webtoon_info.grade
    # webtoon_info.start_date
    # webtoon_info.corlorHsl


    webtoon_info.done()

    print(webtoon_info.webtoons_dict)

    sleep(1)

webtoon_json = webtoon_info.make_json()

