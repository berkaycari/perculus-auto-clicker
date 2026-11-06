# Perculus Automatic Clicker

<p align="center">
  <img src="./icons/icon-128.png" alt="Perculus Automatic Clicker logo" width="128">
</p>

Perculus toplantı sayfalarında görünen **“Buradayım!”**, **“I'm here”** veya
**“I am here”** butonunu otomatik olarak tıklayan Manifest V3 Chrome eklentisi.
Sayfaya bildirim eklemez.

This Manifest V3 Chrome extension automatically clicks visible **“Buradayım!”**,
**“I'm here”**, or **“I am here”** buttons on Perculus meeting pages. It does not
show a notification after the click.

## Installation / Kurulum

1. Download the repository with **Code → Download ZIP** and extract it.
2. Open `chrome://extensions` in desktop Chrome.
3. Enable **Developer mode / Geliştirici modu**.
4. Click **Load unpacked / Paketlenmemiş öğe yükle**.
5. Select the extracted folder containing `manifest.json`.
6. Open or refresh the Perculus meeting page.

After changing files, click **Reload** on the extension card and refresh the
meeting page.

## Supported domains / Desteklenen alan adları

The default configuration matches `*.perculus6.com` and `*.perculus.com`.
Meeting paths and query parameters are not hard-coded.

Varsayılan yapılandırma `*.perculus6.com` ve `*.perculus.com` alan adlarıyla
eşleşir. Toplantı yolu ve sorgu parametreleri sabit değildir.

To use another domain, add a pattern such as
`*://*.your-domain.example/*` to `content_scripts[0].matches` in
`manifest.json`, then reload the extension.

Başka bir alan adı kullanmak için `manifest.json` içindeki
`content_scripts[0].matches` listesine `*://*.your-domain.example/*` biçiminde
bir kalıp ekleyin ve eklentiyi yeniden yükleyin.

## Limitations / Sınırlamalar

The extension runs only on desktop Chrome. Chrome does not support installing
extensions on Android or iOS. Background tabs may be throttled or suspended by
Chrome, so a click can be delayed until the page becomes active again.

Eklenti yalnızca masaüstü Chrome'da çalışır. Android ve iOS Chrome eklenti
yüklemeyi desteklemez. Arka plan sekmeleri Chrome tarafından yavaşlatılabilir
veya askıya alınabilir; bu durumda tıklama sayfa yeniden etkinleşince yapılır.

The extension does not display a confirmation notification after clicking.
It does not verify that Perculus accepted or recorded attendance.
