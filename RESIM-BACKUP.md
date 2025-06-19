# 📸 Resim Yedekleme Sistemi

## 🎯 Sorun
GitHub'a yüklerken admin panelinden yüklenen resimler gitmiyor çünkü localStorage'da saklanıyorlar.

## ✅ Çözümler

### 1. **Export/Import Sistemi (Hemen Kullanılabilir)**
Admin panelde yeni butonlar eklendi:

- **📤 Export**: Tüm verileri (resimler dahil) JSON dosyası olarak indir
- **📥 Import**: JSON dosyasını yükleyerek tüm verileri geri getir

**Kullanım:**
1. Resimleri yükledikten sonra "📤 Export" butonuna bas
2. Dosyayı GitHub'a ekle
3. Başka bilgisayarda "📥 Import" ile geri yükle

### 2. **Backup Klasörü**
`/backups` klasörü oluşturuldu. Buraya export dosyalarınızı koyabilirsiniz.

### 3. **GitHub Actions**
Otomatik backup sistemi kuruldu (isteğe bağlı).

## 🚀 Nasıl Kullanılır

1. **Admin panele git**: `http://localhost:5173/admin`
2. **Resimlerini yükle**
3. **Export et**: "📤 Export" butonuna bas
4. **GitHub'a ekle**: İndirilen JSON dosyasını `backups/` klasörüne ekle
5. **Git commit/push yap**
6. **Başka yerde import et**: "📥 Import" ile geri yükle

## 📁 Dosya Formatı
```json
{
  "content": {
    "heroSlides": [...],
    "aboutImage": "...",
    "projects": [...],
    "partners": [...],
    "jobs": [...]
  },
  "images": {
    "protief-image-hero-1-123456": "data:image/jpeg;base64,...",
    "protief-image-hero-2-789012": "data:image/png;base64,..."
  },
  "uploadedFiles": [...],
  "exportDate": "2025-06-20T...",
  "version": "1.0"
}
```

## 🔧 Gelişmiş Özellikler

- **Otomatik temizlik**: Kullanılmayan resimler silinir
- **Sürüm kontrolü**: Backup dosyalarında sürüm bilgisi
- **Hata kontrolü**: Import sırasında dosya doğrulama
- **Tarih damgası**: Her backup'ta tarih bilgisi
