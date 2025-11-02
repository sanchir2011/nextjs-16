import moment from "moment"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Badge } from "@/components/elements/Badge";
import { CustomBadge } from "@/components/elements/CustomBadge";
import { ShieldCheck, ShieldX } from "lucide-react";
import Tooltip from "@/components/elements/Tooltip";
 
/* ============== Class niiluuleh ============== */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ')
}
/* ============== Check inputs ============== */

export const isValidEmail = (email: string) => { // only email format
  if(!email) return false
  const regex = new RegExp(/^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/, "i")
  return regex.test(email)
}

export const isValidPhoneNumber = (phone: string) => { // all types of phone numbers
  if(!phone) return false
  if(phone.length < 6) return false
  const regex = new RegExp(/^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/)
  return regex.test(phone)
}

export const isValidName = (name: string) => { // Mongolian and English letters, hyphen, apostrophe and space
  if(!name) return false
  const regex = new RegExp('^[\u04ae\u04af\u04e8\u04e9\u0401\u0451\u0410-\u044fa-zA-Z-\' ]+$')
  return regex.test(name)
}

export const isValidUsername = (username: string) => { // only letters, numbers, dots and underscores
  if(!username) return false
  const regex = new RegExp(/^[a-zA-Z0-9._]+$/)
  return regex.test(username)
}

export const isNotEmpty = (value: any) => {
  if(value === undefined || value === null || value === '') return false
  let check = value.split(' ').join('').split('\n').join('')
  if(check === '') return false
  return true
}


/* ============== Check JS variables ============== */

export const isValidBoolean = (something: boolean) => {
  if(typeof something === "boolean") return true
  else return false
}

export const isValidArray = (array: Array<any>) => {
  if(Array.isArray(array)) return true
  else return false
}


/* ============== Utils ============== */

export function formatImageURL(image: string, root = false){ // Use this function if you are using images from bucket
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  let bucket = ''
  if(process.env.NEXT_PUBLIC_BUCKET){
    if(root) bucket = process.env.NEXT_PUBLIC_BUCKET
    else bucket = process.env.NEXT_PUBLIC_BUCKET + 'uploads/'
  }
  if(urlPattern.test(image)) return image
  else return bucket ? bucket + image : image
}

export function formatNumber(number: any){ // 12000 => 12,000
  number = number.toString()
  let pattern = /(-?\d+)(\d{3})/
  while (pattern.test(number))
    number = number.replace(pattern, "$1,$2")
  return number
}

export function formatPrice(amount: any){ // 12000 => 12,000₮
  if(amount === undefined || amount === null) return false
  amount = amount.toString()
  let pattern = /(-?\d+)(\d{3})/
  while (pattern.test(amount))
    amount = amount.replace(pattern, "$1,$2")
  return amount + '₮'
}

export function timeAgo(date: Date) { // 2024-04-10T12:00:00.000Z => 1ц өмнө
  const now = new Date();
  date = new Date(date);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) {
    return `Яг одоо`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}${minutes === 1 ? 'м' : 'м'} өмнө`
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}${hours === 1 ? 'ц' : 'ц'} өмнө`
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days}${days === 1 ? 'ө' : 'ө'} өмнө`
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months}${months === 1 ? ' сарын' : 'сарын'} өмнө`
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years}${years === 1 ? ' жилийн' : 'жилийн'} өмнө`
  }
}

export function timeAgoShort(date: Date) { // 2024-04-10T12:00:00.000Z => 1ц
  const now = new Date();
  date = new Date(date);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) {
    return `Одоо`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}${minutes === 1 ? 'м' : 'м'}`
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}${hours === 1 ? 'ц' : 'ц'}`
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days}${days === 1 ? 'ө' : 'ө'}`
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months}${months === 1 ? ' сар' : 'сар'}`
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years}${years === 1 ? ' жил' : 'жил'}`
  }
}

export function formatDateNormal(date: Date){ // 2024-04-10T12:00:00.000Z => 2024.04.10
  date = new Date(date);
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = String(date.getFullYear());
  return `${year}.${month}.${day}`;
}

export function formatDateTimeNormal(date: Date){ // 2024-04-10T12:00:00.000Z => 2024.04.10 12:00
  date = new Date(date);
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = String(date.getFullYear());
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function formatDateLong(date: Date){ // 2024-04-10T12:00:00.000Z => 2024 оны 04-р сарын 10
  date = new Date(date);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = String(date.getFullYear());
  return `${year} оны ${month}-р сарын ${day}`;
}

export function formatDateTimeLong(date: Date){ // 2024-04-10T12:00:00.000Z => 2024 оны 04-р сарын 10 12:00
  date = new Date(date);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = String(date.getFullYear());
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year} оны ${month}-р сарын ${day} ${hours}:${minutes}`;
}

export function calcBetweenDates(start: Date, end: Date){ // 2024-04-10T12:00:00.000Z, 2024-04-15T12:00:00.000Z => 5
  let startDate = new Date(start)
  let endDate = new Date(end)
  let diff = endDate.getTime() - startDate.getTime()
  let days = diff / (1000 * 60 * 60 * 24)
  return days + 1
}

export function formatTime(seconds: number){ // 3600 => 01:00:00
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor(seconds / 60) - (hours * 60)
  seconds = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}


export function urlBase64ToUint8Array(base64String: any) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')
 
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export const formatTextLinks = (text: string) => {
  if (!text) return ''
  const urlPattern = /((http|https):\/\/[^\s/$.?#].[^\s]*)|(www\.[^\s/$.?#].[^\s]*)/gi
  return text.replace(urlPattern, (match) => {
    const url = match.startsWith('http') ? match : `https://${match}`
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline font-semibold">${match}</a>`
  })
}

export type RoleType = 'superadmin' | 'manager' | 'sales' | 'courier' | 'content' | 'accountant'

export function checkRole({ role, allow, deny, isSuperAdmin = false }: { role: RoleType, allow?: RoleType | RoleType[], deny?: RoleType | RoleType[], isSuperAdmin?: boolean }) {
  if(isSuperAdmin) return true
  if(!role) return false
  if(!allow && !deny) return true
  if(allow && Array.isArray(allow)) {
    if(allow.includes(role)) return true
    else return false
  }
  if(deny && Array.isArray(deny)) {
    if(deny.includes(role)) return false
    else return true
  }
  if(allow && typeof allow === 'string' && allow == role) return true
  if(deny && typeof deny === 'string' && deny == role) return false
  return false
}


export function removeHTMLTags(str: string) {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export function checkPathname(pathname: string | null) {
  if(pathname === null) return '/'
  let pathnames = pathname.split('/')
  return '/' + pathnames[1]
}


export const adminRoleList = [
  { value: 'superadmin', label: 'Системийн админ' },
  { value: 'manager', label: 'Менежер' },
  { value: 'sales', label: 'Борлуулалтын ажилтан' },
  { value: 'courier', label: 'Хүргэлтийн ажилтан' },
  { value: 'content', label: 'Контент менежер' },
  { value: 'accountant', label: 'Нягтлан бодогч' }
]

export function getAdminRoleBadge(role: string) {
  switch (role) {
    case 'owner':
      return <Badge variant="secondary">Дэлгүүрийн эзэн</Badge>
    case 'superadmin':
      return <Badge variant="secondary">Системийн админ</Badge>
    case 'manager':
      return <Badge variant="secondary">Менежер</Badge>
    case 'sales':
      return <Badge variant="secondary">Борлуулалтын ажилтан</Badge>
    case 'courier':
      return <Badge variant="secondary">Хүргэлтийн ажилтан</Badge>
    case 'content':
      return <Badge variant="secondary">Контент менежер</Badge>
    case 'accountant':
      return <Badge variant="secondary">Нягтлан бодогч</Badge>
    default:
      return <Badge variant="secondary">Тодорхойгүй</Badge>
  }
}

export function getAdminRoleText(role: string) {
  switch (role) {
    case 'superadmin':
      return 'Системийн админ'
    case 'manager':
      return 'Менежер'
    case 'sales':
      return 'Борлуулалтын ажилтан'
    case 'courier':
      return 'Хүргэлтийн ажилтан'
    case 'content':
      return 'Контент менежер'
    case 'accountant':
      return 'Нягтлан бодогч'
    default:
      return 'Тодорхойгүй'
  }
}

export function getInvoiceStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return <CustomBadge variant="amber">Хүлээгдэж буй</CustomBadge>
    case 'paid':
      return <CustomBadge variant="green">Төлөгдсөн</CustomBadge>
    case 'canceled':
      return <CustomBadge variant="red">Цуцлагдсан</CustomBadge>
    case 'refunded':
      return <CustomBadge variant="purple">Буцаагдсан</CustomBadge>
    default:
      return <CustomBadge>Тодорхойгүй</CustomBadge>
  }
}

export function getInvoiceStatusText(status: string) {
  switch (status) {
    case 'pending':
      return 'Хүлээгдэж буй'
    case 'paid':
      return 'Төлөгдсөн'
    case 'canceled':
      return 'Цуцлагдсан'
    case 'refunded':
      return 'Буцаагдсан'
    default:
      return 'Тодорхойгүй'
  }
}

export function getInvoiceMethodText(status: string) {
  switch (status) {
    case 'qpay':
      return 'QPay'
    case 'storepay':
      return 'StorePay'
    case 'pocket':
      return 'PocketZero'
    case 'transfer':
      return 'Шилжүүлэг'
    default:
      return 'Тодорхойгүй'
  }
}

export function getSubscriptionStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return <CustomBadge variant="green">Идэвхтэй</CustomBadge>
    case 'inactive':  
      return <CustomBadge variant="red">Идэвхгүй</CustomBadge>
    case 'expired':
      return <CustomBadge variant="red">Хугацаа дууссан</CustomBadge>
    case 'suspended': 
      return <CustomBadge variant="red">Хүчингүй болсон</CustomBadge>
    case 'grace':
      return <CustomBadge variant="amber">Төлбөр гарсан</CustomBadge>
    default:
      return <CustomBadge>Тодорхойгүй</CustomBadge>
  }
}

export function getProductStatusBadge(status: string) {
  switch (status) {
    case 'published':
      return <CustomBadge variant="green">Идэвхтэй</CustomBadge>
    case 'draft':  
      return <CustomBadge>Ноорог</CustomBadge>
    case 'archived':
      return <CustomBadge variant="amber">Архивласан</CustomBadge>
    default:
      return <CustomBadge>Тодорхойгүй</CustomBadge>
  }
}

export function getOrderStatusBadge(status: string, size: "default" | "sm" | "lg" | null | undefined = 'default') {
  switch (status) {
    case 'canceled':
      return <CustomBadge variant="red" size={size}>Цуцлагдсан</CustomBadge>
    case 'refunded':
      return <CustomBadge variant="rose" size={size}>Бүтэн буцаасан</CustomBadge>
    case 'partiallyRefunded':
      return <CustomBadge variant="rose" size={size}>Хагас буцаасан</CustomBadge>
    case 'pending':
      return <CustomBadge variant="amber" size={size}>Хүлээгдэж буй</CustomBadge>
    case 'paid':
      return <CustomBadge variant="green" size={size}>Төлөгдсөн</CustomBadge>
    case 'shipped':  
      return <CustomBadge variant="purple" size={size}>Хүргэлтэнд гарсан</CustomBadge>
    case 'delivered':  
      return <CustomBadge variant="blue" size={size}>Хүргэгдсэн</CustomBadge>
    case 'deliveryFailed':  
      return <CustomBadge variant="red" size={size}>Хүргэлт амжилтгүй</CustomBadge>
    default:
      return <CustomBadge size={size}>Тодорхойгүй</CustomBadge>
  }
}

export function getOrderStatusText(status: string) {
  switch (status) {
    case 'canceled':
      return 'Цуцлагдсан'
    case 'refunded':
      return 'Бүтэн буцаасан'
    case 'partiallyRefunded':
      return 'Хагас буцаасан'
    case 'pending':
      return 'Хүлээгдэж буй'
    case 'paid':
      return 'Төлөгдсөн'
    case 'shipped':  
      return 'Хүргэлтэнд гарсан'
    case 'delivered':  
      return 'Хүргэгдсэн'
    case 'deliveryFailed':  
      return 'Хүргэлт амжилтгүй'
    default:
      return 'Тодорхойгүй'
  }
}

export const orderStatusList = [
  { value: 'pending', label: 'Хүлээгдэж буй' },
  { value: 'paid', label: 'Төлөгдсөн' },
  { value: 'shipped', label: 'Хүргэлтэнд гарсан' },
  { value: 'delivered', label: 'Хүргэгдсэн' },
  { value: 'deliveryFailed', label: 'Хүргэлт амжилтгүй' },
  { value: 'canceled', label: 'Цуцлагдсан', disabled: true },
  { value: 'refunded', label: 'Бүтэн буцаасан', disabled: true },
  { value: 'partiallyRefunded', label: 'Хагас буцаасан', disabled: true },
]

export function getOrderPaymentMethodText(status: string, short: boolean = false) {
  switch (status) {
    case 'qpay':
      return 'QPay'
    case 'storepay':
      return 'StorePay'
    case 'pocket':
      return 'PocketZero'
    case 'transfer':
      return short ? 'Шилжүүлэг' : 'Дансаар шилжүүлэх'
    default:
      return 'Тодорхойгүй'
  }
}

export const orderPaymentMethodList = [
  { value: 'transfer', label: 'Шилжүүлэг' },
  { value: 'qpay', label: 'QPay' },
  { value: 'storepay', label: 'StorePay' },
  { value: 'pocket', label: 'PocketZero' },
]

export function getOrderTypeBadge(status: string, size: "default" | "sm" | "lg" | null | undefined = 'default') {
  switch (status) {
    case 'delivery':
      return <CustomBadge variant="blue" size={size}>Хүргэлтээр</CustomBadge>
    case 'pickup':
      return <CustomBadge variant="rose" size={size}>Салбараас</CustomBadge>
    default:
      return <CustomBadge size={size}>Тодорхойгүй</CustomBadge>
  }
}

export const orderTypeList = [
  { value: 'delivery', label: 'Хүргэлтээр' },
  { value: 'pickup', label: 'Салбараас' },
]

export function flattenCategories(items: any[]) {
  const allItems: any[] = [];

  function traverse(items: any[]) {
    items.forEach((item) => {
      allItems.push(item);
      if (item.children) {
        traverse(item.children);
      }
    });
  }

  traverse(items);

  return allItems;
}

export const deliveryFailedReasons = [
  { id: 'noPerson', name: 'Хүлээн авах хүн байгаагүй', description: 'Тухайн хүргэх газар хүлээн авах хүн байгаагүй', selected: false },
  { id: 'noDial', name: 'Холбоо барих боломжгүй байсан', description: 'Захиалга дээрх холбоо барих дугаар холбогдоогүй', selected: false, },
  { id: 'wrongAddress', name: 'Захиалгын хаяг буруу / олдоогүй', description: 'Захиалгын тухайн хаяг нь байдаггүй эсвэл олдоогүй', selected: false },
  { id: 'other', name: 'Бусад шалтгаан', description: 'Шалтгаанаа бичиж оруулна уу', selected: false },
]

export const canceledReasons = [
  { id: 'fromCustomer', name: 'Үйлчлүүлэгчийн хүсэлтээр', description: 'Тухайн захиалга хийсэн үйлчлүүлэгч цуцлахыг хүссэн', selected: false, },
  { id: 'badInfo', name: 'Дутуу / Буруу мэдээлэл оруулсан', description: 'Захиалгын мэдээлэл нь дутуу эсвэл буруу', selected: false },
  { id: 'fake', name: 'Хуурамч захиалга', description: 'Үнэн, бодит мэдээлэл байхгүй хуурамч захиалга', selected: false },
  { id: 'other', name: 'Бусад шалтгаан', description: 'Шалтгаанаа бичиж оруулна уу', selected: false },
]


export function getGiftStatusBadge(status: string, size: "default" | "sm" | "lg" | null | undefined = 'default') {
  switch (status) {
    case 'canceled':
      return <CustomBadge variant="red" size={size}>Цуцлагдсан</CustomBadge>
    case 'pending':
      return <CustomBadge variant="amber" size={size}>Хүлээгдэж буй</CustomBadge>
    case 'paid':
      return <CustomBadge variant="green" size={size}>Төлөгдсөн</CustomBadge>
    case 'sent':  
      return <CustomBadge variant="blue" size={size}>Илгээсэн</CustomBadge>
    case 'used':  
      return <CustomBadge variant="purple" size={size}>Ашигласан</CustomBadge>
    default:
      return <CustomBadge size={size}>Тодорхойгүй</CustomBadge>
  }
}

export const giftStatusList = [
  { value: 'pending', label: 'Хүлээгдэж буй' },
  { value: 'paid', label: 'Төлөгдсөн' },
  { value: 'sent', label: 'Илгээсэн' },
  { value: 'used', label: 'Ашигласан' },
  { value: 'canceled', label: 'Цуцлагдсан' },
]

export const deliveryTypeList = [
  { value: 'constantDelivery', label: 'Хүргэлттэй (Үнэ тогтмол)' },
  { value: 'noDelivery', label: 'Хүргэлтгүй' },
  { value: 'minOrderAmount', label: 'Тодорхой үнийн дүнгээс дээш үнэгүй' },
  { value: 'laterDelivery', label: 'Хүргэлттэй (Үнэ тусдаа өөрсдөө тооцож авна)' },
  { value: 'freeDelivery', label: 'Бүх хүргэлт үнэгүй' },
]

export const designFontList = [
  { value: 'inter', label: 'Inter' },
  { value: 'gilroy', label: 'Gilroy' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'playpen', label: 'Playpen Sans' },
  { value: 'cormorant', label: 'Cormorant' },
]

export const designColorList = [
  { value: 'blue-500', label: 'Цэнхэр', className: 'text-blue-500' },
  { value: 'red-500', label: 'Цэнхэр', className: 'text-red-500' },
  { value: 'pink-500', label: 'Цэнхэр', className: 'text-pink-500' },
  { value: 'purple-500', label: 'Цэнхэр', className: 'text-purple-500' },
  { value: 'green-500', label: 'Цэнхэр', className: 'text-green-500' },
  { value: 'amber-500', label: 'Цэнхэр', className: 'text-amber-500' },
  { value: 'zinc-800', label: 'Хар', className: 'text-zinc-800' },
]

export const designBorderRadiusList = [
  { value: 'none', label: 'Өнцөгтэй' },
  { value: 'xs', label: 'Маш бага' },
  { value: 'sm', label: 'Бага' },
  { value: 'md', label: 'Дунд' },
  { value: 'lg', label: 'Их' },
  { value: 'xl', label: 'Маш их' },
]

export const designImageAspectList = [
  { value: '1/1', label: '1/1' },
  { value: '3/4', label: '3/4' },
  { value: '4/3', label: '4/3' },
  { value: '16/9', label: '16/9' },
  { value: '9/16', label: '9/16' },
]

export const orderExpireHoursList = [
  { value: '1', label: '1 цаг' },
  { value: '6', label: '6 цаг' },
  { value: '12', label: '12 цаг' },
  { value: '24', label: '24 цаг' },
  { value: '48', label: '48 цаг' },
  { value: '72', label: '72 цаг' },
]

export const refundReasonList = [
  { value: 'Бараа дууссан', label: 'Бараа дууссан' },
  { value: 'Захиалагчийн хүсэлтээр буцаасан', label: 'Захиалагчийн хүсэлтээр буцаасан' },
  { value: 'Буруу бараа', label: 'Буруу бараа' },
  { value: 'Бараа гэмтсэн', label: 'Бараа гэмтсэн' },
  { value: 'Бусад шалтгаан', label: 'Бусад шалтгаан' },
]

export const getTimeRemaining = (endDate: any, startDate: any = moment()) => {
  const start = moment(startDate)
  const end = moment(endDate)
  
  const days = end.diff(start, 'days')
  const hours = end.diff(start, 'hours')
  const minutes = end.diff(start, 'minutes')
  
  if (days > 0) {
    return `${days} хоног`
  } else if (hours > 0) {
    return `${hours} цаг`
  } else if (minutes > 0) {
    return `${minutes} минут`
  } else {
    return 'Дууссан'
  }
}

export function getAICreditBadge(status: string, size: "default" | "sm" | "lg" | null | undefined = 'default') {
  switch (status) {
    case 'expired':
      return <CustomBadge variant="red" size={size}>Хүчингүй</CustomBadge>
    case 'active':
      return <CustomBadge variant="green" size={size}>Идэвхтэй</CustomBadge>
    case 'used':  
      return <CustomBadge variant="purple" size={size}>Ашигласан</CustomBadge>
    case 'soon':  
      return <CustomBadge variant="blue" size={size}>Эхлээгүй</CustomBadge>
    default:
      return <CustomBadge size={size}>Тодорхойгүй</CustomBadge>
  }
}

export const AI_IMAGE_CREDIT_PRICE = 1000
export const AI_TEXT_CREDIT_PRICE = 50

export function getAICreditsInvoiceTypeText(status: string) {
  switch (status) {
    case 'image':
      return 'Зураг кредит'
    case 'text':
      return 'Текст кредит'
    default:
      return 'Тодорхойгүй'
  }
}

export function DanVerifiedIcon({ isVerified = false, placement = 'top', className }: { isVerified: boolean, placement?: string, className?: string }) {
  return (
    <div className="cursor-pointer">
      <Tooltip content={isVerified ? 'ДAН системээр баталгаажсан' : 'ДAН системээр баталгаажаагүй'} placement={placement}>
        { isVerified ? 
          <ShieldCheck className={`size-[18px] text-blue ${className || ''}`} strokeWidth={2.5} /> :
          <ShieldX className={`size-[18px] text-danger ${className || ''}`} strokeWidth={2.5} />
        }
      </Tooltip>
    </div>
  )
}