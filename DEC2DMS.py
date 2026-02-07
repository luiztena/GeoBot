#!/usr/bin/env python3
"""
CONVERSOR SIMPLES: DECIMAL → DMS
Formato de saída: 1° 27' 29.50" S 48° 26' 10.30" W
"""

def converter():
    print("=" * 60)
    print("CONVERSOR DECIMAL PARA DMS")
    print("=" * 60)
    
    while True:
        try:
            # Latitude
            lat_str = input("\n📌 Latitude decimal (ex: -1.458077): ").strip()
            if lat_str.lower() in ['sair', 'exit', '']:
                break
            
            lat = float(lat_str)
            if not -90 <= lat <= 90:
                print("❌ Latitude deve estar entre -90 e 90")
                continue
            
            # Longitude
            lon_str = input("📌 Longitude decimal (ex: -48.435998): ").strip()
            if lon_str.lower() in ['sair', 'exit', '']:
                break
            
            lon = float(lon_str)
            if not -180 <= lon <= 180:
                print("❌ Longitude deve estar entre -180 e 180")
                continue
            
            # Converte latitude
            lat_abs = abs(lat)
            lat_g = int(lat_abs)
            lat_m_dec = (lat_abs - lat_g) * 60
            lat_m = int(lat_m_dec)
            lat_s = round((lat_m_dec - lat_m) * 60, 2)
            lat_dir = 'S' if lat < 0 else 'N'
            
            # Ajusta arredondamento
            if lat_s >= 60:
                lat_s = 0
                lat_m += 1
            if lat_m >= 60:
                lat_m = 0
                lat_g += 1
            
            # Converte longitude
            lon_abs = abs(lon)
            lon_g = int(lon_abs)
            lon_m_dec = (lon_abs - lon_g) * 60
            lon_m = int(lon_m_dec)
            lon_s = round((lon_m_dec - lon_m) * 60, 2)
            lon_dir = 'W' if lon < 0 else 'E'
            
            # Ajusta arredondamento
            if lon_s >= 60:
                lon_s = 0
                lon_m += 1
            if lon_m >= 60:
                lon_m = 0
                lon_g += 1
            
            # Formata resultado
            resultado = f"{lat_g}° {lat_m:02d}' {lat_s:05.2f}\\\" {lat_dir} {lon_g}° {lon_m:02d}' {lon_s:05.2f}\\\" {lon_dir}"
            
            # Mostra
            print("\n" + "=" * 60)
            print("✅ CONVERTIDO!")
            print("=" * 60)
            print("\n📋 COPIE ABAIXO:")
            print("-" * 50)
            print(resultado)
            print("-" * 50)
            
            print(f"\n📊 Resumo:")
            print(f"Latitude:  {lat_g}° {lat_m:02d}' {lat_s:05.2f}\" {lat_dir}")
            print(f"Longitude: {lon_g}° {lon_m:02d}' {lon_s:05.2f}\" {lon_dir}")
            
        except ValueError:
            print("❌ Digite um número válido")
        except Exception as e:
            print(f"❌ Erro: {e}")

if __name__ == "__main__":
    converter()