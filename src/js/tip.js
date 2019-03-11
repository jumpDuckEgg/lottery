/**
 * 提示与加载工具类
 */
export default class Tips {
    constructor() {
        this.isLoading = false;
    }

    /**
     * 弹出提示框
     */
    static success(title, duration = 500) {
        setTimeout(() => {
            wx.showToast({
                title: title,
                icon: "success",
                mask: true,
                duration: duration
            });
        }, 300);
        if (duration > 0) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, duration);
            });
        }
    }

    /**
     * 弹出确认窗口
     */
    static confirm(text, showCancel = false, title = "", confirmText = "确定", cancelText = "取消") {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: title,
                content: text,
                showCancel: showCancel,
                confirmText: confirmText,
                cancelText: cancelText,
                success: res => {
                    if (res.confirm) {
                        resolve();
                    } else if (res.cancel) {
                        reject();
                    }
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    }

    /**
     * 即时弹窗
     */
    static toast(title = '', duration = 1000, icon = "loading") {
        if (title.length > 7) {
            icon = 'none'
        }
        wx.showToast({
            title: title,
            icon: icon,
            mask: true,
            duration: duration
        });
    }

    /**
     * 弹出加载提示
     */
    static loading(title = "加载中") {
        if (Tips.isLoading) {
            return;
        }
        Tips.isLoading = true;
        wx.showLoading({
            title: title,
            mask: true
        });
    }

    /**
     * 加载完毕
     */
    static loaded() {
        if (Tips.isLoading) {
            Tips.isLoading = false;
            wx.hideLoading();
        }
    }


    /**
     * 防止重复点击锁
     */
    static lock(duration = 1500) {
        var time = Date.now();
        if ((time - this.lockTime) < duration) {
            Tips.toast('操作频繁');
            return false;
        } else {
            this.lockTime = time;
            return true;
        }
    }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;

/**
 * 时间锁
 */
Tips.lockTime = '';
