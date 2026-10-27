import React, { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, FileArchive, Server, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';

export const DownloadSection: React.FC = () => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const sha256Checksum = '1749925b7d524e6574432aa180d9040613fc5b1eed46dd328424f0251d03382c';

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(sha256Checksum);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const handleDownload = (filename: string) => {
    setDownloadStatus(`Downloading ${filename}...`);
    const link = document.createElement('a');
    link.href = `/downloads/${filename}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDownloadStatus(null);
    }, 4000);
  };

  return (
    <section id="download" className="cs-section">
      <div className="cs-section-inner">
        <div className="cs-section-header">
          <div>
            <span className="cs-section-tag">OFFICIAL DISTRIBUTION</span>
            <h2 className="cs-section-title">
              Download Navi for <br />
              <span className="cs-monochrome-title">Windows 10 / 11 (x64)</span>
            </h2>
          </div>
          <p className="cs-section-desc">
            Get the production binary with the pre-compiled native Win32 keyboard hook and bundled Python 3.11 execution runtime. Ready for computer lab deployment.
          </p>
        </div>

        {downloadStatus && (
          <div className="cs-download-status-banner">
            <CheckCircle2 size={16} style={{ color: 'var(--cs-success-green)' }} />
            <span>{downloadStatus}</span>
          </div>
        )}

        <div className="cs-download-grid">
          {/* Main Installer Card */}
          <div className="cs-main-installer-card">
            <div className="cs-installer-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--cs-text-main)' }}>
                    Navi Windows Setup (.exe)
                  </span>
                  <span className="cs-version-pill">
                    v1.0.4
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--cs-text-secondary)', marginTop: '4px' }}>
                  Standard Windows Executable · Zero install, plug-and-play for students & labs
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cs-text-muted)', fontFamily: 'Fira Code, monospace' }}>
                78.7 MB
              </span>
            </div>

            <button
              type="button"
              className="cs-btn-download-big"
              onClick={() => handleDownload('Navi-Setup-1.0.4.exe')}
            >
              <Download size={18} />
              <span>Download Navi-Setup-1.0.4.exe</span>
            </button>

            <div className="cs-hash-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <span style={{ color: 'var(--cs-text-dim)', fontSize: '11px' }}>SHA-256:</span>
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '11px' }}>
                  {sha256Checksum.slice(0, 32)}...
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyChecksum}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--cs-text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                {copiedHash ? (
                  <>
                    <Check size={13} style={{ color: 'var(--cs-success-green)' }} />
                    <span style={{ color: 'var(--cs-success-green)' }}>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secondary Downloads: Portable ZIP & MSI */}
          <div className="cs-secondary-downloads">
            <div className="cs-alt-download-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="cs-bento-icon-box" style={{ marginBottom: 0 }}>
                  <FileArchive size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--cs-text-main)' }}>
                    Portable Standalone (.zip)
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)' }}>
                    Zero-installation executable for flash drives · 91.5 MB
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="cs-tab-btn"
                onClick={() => handleDownload('Navi-Setup-1.0.4.exe')}
              >
                Download
              </button>
            </div>

            <div className="cs-alt-download-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="cs-bento-icon-box" style={{ marginBottom: 0 }}>
                  <Server size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--cs-text-main)' }}>
                    Lab Enterprise Package (.msi)
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)' }}>
                    Quiet install for Active Directory Group Policy (GPO)
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="cs-tab-btn"
                onClick={() => handleDownload('Navi-Setup-1.0.4.exe')}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* System Requirements Table */}
        <div className="cs-specs-table">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cs-text-muted)', fontSize: '11px', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>
              <Cpu size={13} />
              <span>OPERATING SYSTEM</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cs-text-main)', marginTop: '8px' }}>
              Windows 10 / 11
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)', marginTop: '2px' }}>
              64-bit architecture (x64, ARM64 via emulation)
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cs-text-muted)', fontSize: '11px', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>
              <HardDrive size={13} />
              <span>MINIMUM MEMORY</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cs-text-main)', marginTop: '8px' }}>
              4 GB RAM
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)', marginTop: '2px' }}>
              Low memory footprint (~120MB idling)
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cs-text-muted)', fontSize: '11px', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>
              <ShieldCheck size={13} />
              <span>SECURITY HOOK</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cs-text-main)', marginTop: '8px' }}>
              Win32 WH_KEYBOARD_LL
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)', marginTop: '2px' }}>
              Standard user privileges (no root/admin needed)
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cs-text-muted)', fontSize: '11px', fontWeight: 700, fontFamily: 'Fira Code, monospace' }}>
              <Download size={13} />
              <span>RELEASE CHANNEL</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cs-text-main)', marginTop: '8px' }}>
              Stable v1.0.4-rc
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)', marginTop: '2px' }}>
              Verified clean by Windows Defender
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
